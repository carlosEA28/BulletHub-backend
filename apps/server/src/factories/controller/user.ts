import {GithubClient} from "@/service/external/github";
import {PostgresGetUserByIdRepository} from "@/repositories/postgres/user/getUserById";
import {GetUsersReposService} from "@/service/user/get-user-repos";
import {GetUserReposController} from "@/controller/user/get-user-repos";

export const makeGetUserReposController = () =>{
    const githubClient = new GithubClient()
    const getUserByIdRepository = new PostgresGetUserByIdRepository()

    const getUserReposService = new GetUsersReposService(githubClient,getUserByIdRepository)

    return new GetUserReposController(getUserReposService)

}

