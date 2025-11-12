import {axiosInstance} from "@/utils/axios";
import {type GetUserReposData} from "@/schemas/github";
import {ReposNotFound} from "@/erros/external/github";

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
}
