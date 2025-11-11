import prisma from "@my-better-t-app/db";

export class PostgresGetUserByIdRepository {
    async execute(userId: string) {
        return await prisma.user.findUnique({
            where: {
                id: userId,
            }
        })
    }
}