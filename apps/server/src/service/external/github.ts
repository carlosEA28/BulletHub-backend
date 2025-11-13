import {axiosInstance} from "@/utils/axios";
import {type GetUserReposData, RepoSchema} from "@/schemas/github";
import {ReposNotFound} from "@/erros/external/github";
import z from "zod";

export class GithubClient {
    async getUserRepos(username: string): Promise<GetUserReposData> {
        const response = await axiosInstance.get(`https://api.github.com/users/${username}/repos`);
        const repos = response.data;

        if (!Array.isArray(repos) || repos.length === 0) {
            throw new ReposNotFound()
        }

        return repos.map((repo: any) => ({
            repoId: repo.id,
            repoName: repo.name,
            fullRepoName: repo.full_name,
            owner: {
                login: repo.owner.login,
                linkToRepo: repo.html_url,
            },
            description: repo.description,
            mainLanguage: repo.language,
        }));
    }

    async getSpecifycRepo(username: string, repoName:string): Promise<z.infer<typeof RepoSchema>>{
        const response = await axiosInstance.get(`https://api.github.com/repos/${username}/${repoName}`);
        const repo = response.data;

        if (!repo) {
            throw new ReposNotFound();
        }

        return RepoSchema.parse({
            repoId: repo.id,
            repoName: repo.name,
            fullRepoName: repo.full_name,
            owner: {
                login: repo.owner.login,
                linkToRepo: repo.owner.html_url,
            },
            description: repo.description ?? "No description provided.",
            mainLanguage: repo.language ?? "Unknown",
        });
    }
}
