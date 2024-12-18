import express, { NextFunction, Request, Response } from 'express';
import UserService from "../service/User.service";
import { PlannerInput, UserInput } from "../types";
import PlannerService from '../service/Planner.service';

const plannerRouter = express.Router();


plannerRouter.post('/create/:username', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const plannerInput = <PlannerInput>req.body;
        const userName = req.params.username
        const response = await PlannerService.createPlannerForUserByUsername(plannerInput, userName)
        res.status(200).json({ message: 'Auth succesful', ...response });
    } catch (error) {
        next(error);
    }
});

export { plannerRouter }