/**
 * Workaround for Prisma client getting re-instantiated on every
 * reload by Next.js in dev.
 *
 * Copied from https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
 */

const { PrismaClient } = require("@prisma/client");

const globalForPrisma = global;

const prisma = globalForPrisma.prisma ?? new PrismaClient().$extends({
    model: {
        user: {
            async isEmailTaken(email) {
                const user = await prisma.user.findUnique({
                    where: { email },
                  });
                return !!user;
            }
        }
    }
});

module.exports = {
    prisma
}
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
