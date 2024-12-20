import express, { NextFunction, Request, Response } from 'express';
import UserService from "../service/User.service";
import { PlannerInput, UserInput } from "../types";
import PlannerService from '../service/Planner.service';

const plannerRouter = express.Router();


plannerRouter.post('/create/:username', async (req: Request & { auth: any }, res: Response, next: NextFunction) => {
    try {
        if (req.auth.role != 'admin' && req.auth.role != 'user') throw new Error('logged in user may not be a guest');

        const plannerInput = <PlannerInput>req.body;
        const userName = req.params.username
        const result = await PlannerService.createPlannerForUserByUsername(plannerInput, userName)
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

plannerRouter.put("/add/:activityId/to/:plannerId", async (req: Request & { auth: any }, res: Response, next: NextFunction) => {
    try {
        if (req.auth.role != 'admin' && req.auth.role != 'user') throw new Error('logged in user may not be a guest');

        const activityId = parseInt(req.params.activityId);
        const plannerId = parseInt(req.params.plannerId);
        const result = await PlannerService.addActivityToPlanner(activityId, plannerId);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});


export { plannerRouter }