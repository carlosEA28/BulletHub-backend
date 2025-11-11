import {UploadUserMainCvService} from "@/service/cv/upload-user-main-cv";
import {auth} from "@my-better-t-app/auth";
import type {Request} from "express";
import {fromNodeHeaders} from "better-auth/node";
import {ZodError} from "zod";
import {CurriculumAlreadyExists, NoFileUploadedError, UnauthorizedError} from "@/erros/cv";

export class UploadMainCVController {

    constructor(private uploadMainCv:UploadUserMainCvService) {
        this.uploadMainCv = uploadMainCv;
    }

    async execute(httpRequest: Request) {

        try {

            const session = await auth.api.getSession({
                headers: fromNodeHeaders(httpRequest.headers)
            })

            if (!session?.user) {
                throw new Error('Não autenticado')
            }

            const { file } = httpRequest;

            return await this.uploadMainCv.execute({
                title: file!.originalname,
                fileBuffer: file!.buffer,
                fileMimeType: file!.mimetype,
                userId: session.user.id
            });



        } catch (e) {
            if(e instanceof ZodError){
                return e.message
            }

            if(e instanceof CurriculumAlreadyExists){
                return e.message
            }

            if(e instanceof UnauthorizedError){
                return e.message
            }

            if(e instanceof NoFileUploadedError){
                return e.message
            }



            console.log(e)
            //criar resposta internal server error
        }
    }
}