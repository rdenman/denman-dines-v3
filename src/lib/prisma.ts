import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "../app/generated/prisma";

const globalForPrisma = global as unknown as {
  prisma: ReturnType<PrismaClient["$extends"]>;
};

const prisma =
  globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate());

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
