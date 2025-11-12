import {Request} from "express";
import type {GetUsersReposService} from "@/service/user/get-user-repos";
import {badRequest, notFound, ok, serverError} from "@/controller/helpers/httpHelpers";
import {ZodError} from "zod";
import {ReposNotFound} from "@/erros/external/github";

export class GetUserReposController {
    constructor(private getUserReposService:GetUsersReposService) {
    }

    async execute(httpRequest: Request){
        try {
            const {username} = httpRequest.params
            const userId = (httpRequest as any).session.user.id;


            const repos = await this.getUserReposService.execute({
                username: username,
                user_id:userId
            })

            return ok(repos)
        }catch(err){
            if(err instanceof ZodError){
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



