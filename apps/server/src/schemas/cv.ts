import z from 'zod'

export const UploadCvSchema = z.object({
    title: z.string().min(1,{error:"The title is required"}),
    cv_url: z.url().min(1,{error:"The url is required"}),
    userId: z.uuid({error:"The id is invalid"}),
})

export type UploadCvData = z.infer<typeof UploadCvSchema>;