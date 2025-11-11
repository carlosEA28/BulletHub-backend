import {UploadUserMainCvService} from "@/service/cv/upload-user-main-cv";
import {auth} from "@my-better-t-app/auth";
import type {Request} from "express";
import {fromNodeHeaders} from "better-auth/node";

export class UploadMainCVController {

    constructor(private uploadMainCv:UploadUserMainCvService) {
        this.uploadMainCv = uploadMainCv;
    }

    async execute(httpRequest: Request) {
        console.log('🚀 Controller executado!') // ⬅️ PRIMEIRO LOG

        try {

            const session = await auth.api.getSession({
                headers: fromNodeHeaders(httpRequest.headers)
            })

            console.log('👤 Session resultado:', session)

            //escrever um erro custom
            if (!session?.user) {
                console.log('❌ Sessão não encontrada ou usuário null')
                throw new Error('Não autenticado')
            }

            const { file } = httpRequest;

            //escrever um erro custom
            if (!file) {
                console.log('❌ Nenhum arquivo encontrado no request')
                throw new Error('Arquivo não encontrado')
            }


            const result = await this.uploadMainCv.execute({
                title: file.originalname,
                fileBuffer: file.buffer,
                fileMimeType: file.mimetype,
                userId: session.user.id
            });

            return result;

        } catch (e) {
            console.error('❌ Erro no controller:', e);
            throw e;
        }
    }
}