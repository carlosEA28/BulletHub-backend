import {axiosInstance} from "@/utils/axios";
import {type GetUserReposData, RepoSchema} from "@/schemas/github";
import {ReposNotFound} from "@/erros/external/github";
import z from "zod";
import {DEPENDENCY_EXTENSION} from "@/constants/dependencyExtension";

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

    async getSpecifycRepo(username: string, repoName:string): Promise<z.infer<typeof RepoSchema>> {
        const response = await axiosInstance.get(`https://api.github.com/repos/${username}/${repoName}`);
        const repo = response.data;

        if (!repo) {
            throw new ReposNotFound();
        }

        const mainLanguage = repo.language ?? "Unknown";

        let dependencyContent = null;
        if (mainLanguage !== "Unknown") {
            try {
                dependencyContent = await this.getDependencyFileContent(
                    username,
                    repoName,
                    mainLanguage
                );
            } catch (e) {
                console.warn(`Arquivo de dependência não encontrado para ${repoName}.`);
            }
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
            mainLanguage: mainLanguage,
            content: JSON.parse(dependencyContent!),
        });
    }

    async getDependencyFileContent(
        username: string,
        repoName: string,
        mainLanguage: string
    ): Promise<string> {

        if (!mainLanguage) {
            throw new Error();
        }
        const normalizedLanguage = mainLanguage.charAt(0).toUpperCase() + mainLanguage.slice(1).toLowerCase();

        const dependencyInfo = DEPENDENCY_EXTENSION.find(
            item => item.language.toLowerCase() === normalizedLanguage.toLowerCase()
        );

        if (!dependencyInfo) {
            throw new Error();
        }

        const filePath = dependencyInfo.extension;

        const url = `https://api.github.com/repos/${username}/${repoName}/contents/${filePath}`;

        try {
            const response = await axiosInstance.get(url, {
                headers: {
                    'Accept': 'application/vnd.github.v3.raw'
                },
                responseType: 'text',
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
