import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// colocar url no env
const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CLOUDFLARE_TOKEN_VALUE}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_R2!,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_KEY!,
  },
});

export class Cloudflare {
  async uploadFile(key: string, body: File) {
    const params = {
      Bucket: process.env.CLOUDFLARE_BUCKET_NAME!,
      Key: `${key}.pdf`,
      Body: body,
    };

    const command = new PutObjectCommand(params);

    await r2.send(command);

    const signedUrl = await getSignedUrl(r2, command, {
      expiresIn: 60 * 60,
    });

    return signedUrl;
  }
}
