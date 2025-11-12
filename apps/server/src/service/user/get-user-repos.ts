import type {GithubClient} from "@/service/external/github";
import type {GetUserReposParams} from "@/schemas/github";
import type {PostgresGetUserByIdRepository} from "@/repositories/postgres/user/getUserById";
import {UserNotFoundError} from "@/erros/user";
import {ReposNotFound} from "@/erros/external/github";

export class GetUsersReposService {
    constructor(private githubClient:GithubClient,
                private getUserById:PostgresGetUserByIdRepository,
                ) {
    }
    async execute(getUserReposarams:GetUserReposParams){

        const userExists = await this.getUserById.execute(getUserReposarams.user_id)

        if(!userExists){
            throw new UserNotFoundError()
        }


        const repos = this.githubClient.getUserRepos(getUserReposarams.username)

        if(!repos){
            throw new ReposNotFound()
        }
        return repos
    }
}