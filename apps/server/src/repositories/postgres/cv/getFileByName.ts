import prisma from "@my-better-t-app/db";

export class PostgresGetFileByName{
    async execute(name:string){
        const cv = await prisma.cv.findFirst({
            where:{
                title:name
            }
        })

        return cv
    }
}