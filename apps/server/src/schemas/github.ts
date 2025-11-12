import {z} from "zod";

export const RepoSchema = z.object({
    repoId: z.number(),
    repoName: z.string().min(1, { message: "The name of the repository is required" }),
    fullRepoName: z.string().min(1, { message: "The full name of the repository is required" }),
    owner: z.object({
        login: z.string().min(1, { message: "The owner name is required" }),
        linkToRepo: z.string().min(1, { message: "The link to repo is required" }),
    }),
    description: z.string().nullable(),
    mainLanguage: z.string().nullable(),
});
export const GetUserReposSchema = z.array(RepoSchema);

export type GetUserReposData = z.infer<typeof GetUserReposSchema>;

export const GetuserReposParams=z.object({
    username: z.string().min(1, { message: "The user name is required" }),
    user_id: z.string().min(1, { message: "The user id is required" }),
})

export type GetUserReposParams = z.infer<typeof GetuserReposParams>;