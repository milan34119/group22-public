import express, { NextFunction, Request, Response } from 'express';
import ActivityService from '../service/Activity.service';
import { ActivityInput } from '../types';

const activityRouter = express.Router();


activityRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const activityId = parseInt(req.params.id)
        const result = await ActivityService.getActivity(activityId);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

activityRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const activityInput = <ActivityInput>req.body;
        const result = await ActivityService.createActivity(activityInput);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

export { activityRouter }