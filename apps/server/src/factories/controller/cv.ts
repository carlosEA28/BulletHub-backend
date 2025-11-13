import {CloudflareService} from "@/service/cloudflare/cloudflare";
import {PostgresGetFileByName} from "@/repositories/postgres/cv/getFileByName";
import {PostgresUploadCv} from "@/repositories/postgres/cv/upload_cv";
import {UploadUserMainCvService} from "@/service/cv/upload-user-main-cv";
import {UploadMainCVController} from "@/controller/cv/upload_main_cv";
import {PostgresGetUserByIdRepository} from "@/repositories/postgres/user/getUserById";

export const makeUploadMainCvController = () =>{
    const cloudflare = new CloudflareService()

    const getUserById = new PostgresGetUserByIdRepository()
    const getCvByTitle = new PostgresGetFileByName()
    const uploadCv = new PostgresUploadCv()

    const uploadCvService = new UploadUserMainCvService(cloudflare,getUserById,getCvByTitle,uploadCv)

    return new UploadMainCVController(uploadCvService)
}