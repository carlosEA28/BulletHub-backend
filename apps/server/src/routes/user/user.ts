import {type Request, type Response, Router} from "express";
import {authenticationMiddleware} from "@/middlewares/authenticationMiddleware";
import {makeGetUserReposController} from "@/factories/controller/user";

export const userRouter = Router()

userRouter.get("/repos/:username", authenticationMiddleware,async (req: Request, res: Response) => {
    const userController = await makeGetUserReposController();

    const { statusCode, body } = await userController.execute(req);
    res.status(statusCode).send(body);
})