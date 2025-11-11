import type {Request, Response} from "express";
import {Router} from "express";

import {upload} from "@/middlewares/multer";
import {makeUploadMainCvController} from "@/factories/controller/cv";

// @ts-ignore
export const cvRouter = Router()

cvRouter.post("/",upload.single("cv"), async (req:Request,res:Response)=>{
    const cvController = makeUploadMainCvController()



    // @ts-ignore
    const up = await cvController.execute(req)

    res.send(up)
})