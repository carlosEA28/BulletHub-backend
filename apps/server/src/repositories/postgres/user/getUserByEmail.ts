import prisma from "@my-better-t-app/db";

export class PostgresGetUserByEmailRepositry{
    async execute(email: string){
        return await prisma.user.findUnique({where: {email}})
    }
}