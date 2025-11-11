import {type Request, type Response, Router} from "express";
import {upload} from "@/middlewares/multer";
import {makeUploadMainCvController} from "@/factories/controller/cv";

export const cvRouter = Router() as ReturnType<typeof Router>
cvRouter.post("/",upload.single("cv"), async (req:Request,res:Response)=>{
    const cvController = makeUploadMainCvController()

    const up = await cvController.execute(req)

    res.send(up)
})