import {GithubClient} from "@/service/external/github";
import {PostgresGetUserByIdRepository} from "@/repositories/postgres/user/getUserById";
import {GetUsersReposService} from "@/service/user/get-user-repos";
import {GetUserReposController} from "@/controller/user/get-user-repos";
import {GetSpecifycRepoService} from "@/service/user/get-specifyc-repo";
import {GetSpecyficRepoController} from "@/controller/user/get-specyfic-repo";

export const makeGetUserReposController = () =>{
    const githubClient = new GithubClient()
    const getUserByIdRepository = new PostgresGetUserByIdRepository()

    const getUserReposService = new GetUsersReposService(githubClient,getUserByIdRepository)

    return new GetUserReposController(getUserReposService)

}
export const makeGetSpecifycReposController = () =>{
    const githubClient = new GithubClient()
    const getUserByIdRepository = new PostgresGetUserByIdRepository()

    const getSpecifycRepoService = new GetSpecifycRepoService(githubClient,getUserByIdRepository)

    return new GetSpecyficRepoController(getSpecifycRepoService)

}

