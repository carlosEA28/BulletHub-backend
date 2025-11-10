import prisma from "@my-better-t-app/db";
import type {UploadCvData} from "@/schemas/cv";

export class PostgresUploadCv{
    async execute(uploadCvParams: UploadCvData){
        const cv = await prisma.cv.create({
            data:{
                title: uploadCvParams.title,
                cv_url: uploadCvParams.cv_url,
                user_id:uploadCvParams.userId
            }
        })
        return cv;
    }
}