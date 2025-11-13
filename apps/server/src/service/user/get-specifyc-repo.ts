import type {GithubClient} from "@/service/external/github";
import type {GetSpecifycRepoParamss} from "@/schemas/github";
import type {PostgresGetUserByIdRepository} from "@/repositories/postgres/user/getUserById";
import {UserNotFoundError} from "@/erros/user";
import {ReposNotFound} from "@/erros/external/github";

export class GetSpecifycRepoService {
    constructor(private githubClient:GithubClient,
                private getUserById:PostgresGetUserByIdRepository,
    ) {
    }
    async execute(getSpecyficRepoParams:GetSpecifycRepoParamss){

        const userExists = await this.getUserById.execute(getSpecyficRepoParams.userId)

        if(!userExists){
            throw new UserNotFoundError()
        }


        const repo = await this.githubClient.getSpecifycRepo(getSpecyficRepoParams.username,getSpecyficRepoParams.repoName)

        if(!repo){
            throw new ReposNotFound()
        }
        return repo
    }
}