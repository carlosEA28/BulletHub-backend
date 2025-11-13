import type {Request} from "express";
import {badRequest, notFound, ok, serverError} from "@/controller/helpers/httpHelpers";
import {ZodError} from "zod";
import {ReposNotFound} from "@/erros/external/github";
import type {GetSpecifycRepoService} from "@/service/user/get-specifyc-repo";
import {GetSpecifycRepoParams} from "@/schemas/github";

export class GetSpecyficRepoController {
    constructor(private getSpecifycService:GetSpecifycRepoService) {
    }

    async execute(httpRequest: Request){
        try {
            const {username,repoName} = httpRequest.params
            const userId = (httpRequest as any).session.user.id;


            const validatedParams = await GetSpecifycRepoParams.parseAsync({
                userId: userId,
                repoName: repoName,
                username: username,
            })

            const repos = await this.getSpecifycService.execute(validatedParams)

            return ok(repos)
        }catch(err){
            if(err instanceof ZodError){
                console.log("ZOD ERROR DETAILS:", err.message);
                return badRequest({
                    message:err.message,
                })
            }

            if(err instanceof ReposNotFound){
                return notFound({
                    message:err.message,
                })
            }

            console.log(err)
            return serverError("Internal server error");
        }
    }
}



