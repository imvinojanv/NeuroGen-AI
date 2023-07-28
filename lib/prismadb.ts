import { PrismaClient } from "@prisma/client";

// Add prisma variable to our global window
declare global {
    var prisma: PrismaClient | undefined;
};

const prismadb = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;     // for the development

export default prismadb;