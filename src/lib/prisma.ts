import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const globalForPrisma = global as unknown as {
  prisma: ReturnType<PrismaClient["$extends"]>;
};

console.log("globalForPrisma", globalForPrisma);
console.log("DATABASE_URL", process.env.DATABASE_URL);
console.log("DIRECT_DATABASE_URL", process.env.DIRECT_DATABASE_URL);

const prisma =
  globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate());

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
