import {HeadObjectCommand, PutObjectCommand} from "@aws-sdk/client-s3";
import {r2} from "@/utils/cloudflare";


export class CloudflareService {
    async uploadFile(fileName:string, fileBuffer:Buffer, mimeType:string) {

        const allowedType = "application/pdf"

        if(mimeType !== allowedType){
            throw new Error("File not supported")
        }

        console.log("Bucket:", process.env.R2_BUCKET_NAME);

        const params = {
            Bucket: process.env.R2_BUCKET_NAME!,
            Key: fileName,
            Body: fileBuffer,
            ContentType: mimeType
        };

        const command = new PutObjectCommand(params);

        await r2.send(command);

        console.log("File uploaded successfully.");

        return `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${process.env.R2_BUCKET_NAME}/${fileName}`;



    }

    async exists(key: string): Promise<boolean> {
        try {
            await r2.send(new HeadObjectCommand({
                Bucket: process.env.CLOUDFLARE_BUCKET_NAME!,
                Key: key
            }));

            return true; 
        } catch (err: any) {
            if (err.name === "NotFound") return false;
            throw err;
        }
    }

}
