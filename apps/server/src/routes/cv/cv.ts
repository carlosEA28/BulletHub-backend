import {type Request, type Response, Router} from "express";
import {upload} from "@/middlewares/multer";
import {makeUploadMainCvController} from "@/factories/controller/cv";
import {authenticationMiddleware} from "@/middlewares/authenticationMiddleware";

export const cvRouter = Router() as ReturnType<typeof Router>
cvRouter.post("/",upload.single("cv"),authenticationMiddleware, async (req:Request,res:Response)=>{
    const cvController = makeUploadMainCvController()

    const {statusCode, body} = await cvController.execute(req)

    res.status(statusCode).send(body)
})