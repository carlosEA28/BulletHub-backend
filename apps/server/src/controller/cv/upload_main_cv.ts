import {UploadUserMainCvService} from "@/service/cv/upload-user-main-cv";
import type {Request} from "express";
import {ZodError} from "zod";
import {CurriculumAlreadyExists, NoFileUploadedError, UnauthorizedError} from "@/erros/cv";
import {badRequest, created, serverError, unauthorized} from "@/controller/helpers/httpHelpers";

export class UploadMainCVController {

    constructor(private uploadMainCv:UploadUserMainCvService) {
        this.uploadMainCv = uploadMainCv;
    }

    async execute(httpRequest: Request) {

        try {
            const { file } = httpRequest;
            const userId = (httpRequest as any).session.user.id;

            const result = await this.uploadMainCv.execute({
                title: file!.originalname,
                fileBuffer: file!.buffer,
                fileMimeType: file!.mimetype,
                userId: userId
            });

            return created(result);

        } catch (e) {
            if(e instanceof ZodError){
                return badRequest({
                    message:e.message,
                })
            }

            if(e instanceof CurriculumAlreadyExists){
                return badRequest({
                    message:e.message,
                })
            }

            if(e instanceof UnauthorizedError){
                return unauthorized({
                    message:e.message,
                })
            }

            if(e instanceof NoFileUploadedError){
                return badRequest({
                    message:e.message,
                })
            }

            console.log(e)
            return serverError("Internal Server Error")
        }
    }
}





