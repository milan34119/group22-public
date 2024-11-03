import UserService from "../service/User.service";
import express, { NextFunction, Request, Response } from 'express';
import { LoginInput, PostInput, UserInput } from "../types";

const userRouter = express.Router();

userRouter.get(
    "/",
    async (req: Request, res: Response) => {
      try {
        const allUsers = await UserService.getAllUsers();
        res.status(200).json(allUsers);
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ error: "An error occurred while fetching users" });
      }
    }
  );

userRouter.get('/:id/activities', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserService.getAllUserActivitiesById(Number(req.params.id));
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

userRouter.post('/:id/activity', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const post = <PostInput>req.body;
        const result = await UserService.addActivityToUserById(post, Number(req.params.id));
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

userRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = <UserInput>req.body;
        const result = await UserService.addUser(user);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const login = <LoginInput>req.body;
        const result = await UserService.login(login);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});



export {userRouter};