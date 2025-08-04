import fs from "node:fs/promises";
import https from "node:https";
import { pipeline } from "node:stream";
import getRawBody from "raw-body";
import { request } from "undici";

const [key, cert] = await Promise.all([
  fs.readFile("./certificates/localhost-key.pem"),
  fs.readFile("./certificates/localhost.pem"),
]);

https
  .createServer({ key, cert }, async (req, res) => {
    try {
      const url = new URL(req.url || "", "https://localhost:3000");
      const target = `http://localhost:3001${url.pathname}${url.search}`;

      const hasBody = !["GET", "HEAD"].includes(req.method);

      const headers = { ...req.headers };
      headers["accept-encoding"] = "identity";
      headers["x-forwarded-host"] = "localhost:3000";
      headers["x-forwarded-proto"] = "https";
      headers["host"] = "localhost:3000";
      delete headers["content-length"];

      let body;
      if (hasBody) {
        body = await getRawBody(req);
        headers["content-length"] = body.length;
      }

      const proxyRes = await request(target, {
        method: req.method,
        headers,
        ...(hasBody && { body }),
      });

      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      pipeline(proxyRes.body, res, (err) => {
        if (err) console.error("Stream pipeline error:", err);
      });
    } catch (err) {
      console.error("Proxy error:", err);
      res.writeHead(502);
      res.end("Bad Gateway");
    }
  })
  .listen(3000, () => {
    console.log("✅ HTTPS proxy running at https://localhost:3000");
  });
