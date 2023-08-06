import { PrismaClient } from "@prisma/client";

// Add prisma variable to our global window
declare global {
    var prisma: PrismaClient | undefined;
};

const prismadb = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;     // for the development

// prismadb.$connect()
//     .then(() => console.log("Prisma client connected to the database"))
//     .catch((error) => {
//         console.error("Error connecting to the database:");
//         console.error(error);
//         process.exit(1);
//     });

export default prismadb;