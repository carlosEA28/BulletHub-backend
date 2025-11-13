import {type Request, type Response, Router} from "express";
import {authenticationMiddleware} from "@/middlewares/authenticationMiddleware";
import {makeGetSpecifycReposController, makeGetUserReposController} from "@/factories/controller/user";

export const userRouter = Router() as ReturnType<typeof Router>


userRouter.get("/repos/:username/:repoName", authenticationMiddleware,async (req: Request, res: Response) => {
    const userController =  makeGetSpecifycReposController();

    const { statusCode, body } = await userController.execute(req);
    res.status(statusCode).send(body);
})

userRouter.get("/repos/:username", authenticationMiddleware,async (req: Request, res: Response) => {
    const userController =  makeGetUserReposController();

    const { statusCode, body } = await userController.execute(req);
    res.status(statusCode).send(body);
})

