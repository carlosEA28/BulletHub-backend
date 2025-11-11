import {S3Client} from "@aws-sdk/client-s3";

// colocar url no env
export const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_R2!,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_KEY!,
  },
});

