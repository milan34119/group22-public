import express, { NextFunction, Request, Response } from 'express';
import UserService from "../service/User.service";
import { PlannerInput, UserInput } from "../types";
import PlannerService from '../service/Planner.service';

const plannerRouter = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /planner:
 *   post:
 *     summary: create a new planner
 *     tags: 
 *          - admin
 *          - user
 *     description: create a new planner based on a json body.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: An activity.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Activity'
 *       403:
 *         description: Unauthorized. Only admins or users can access this route.
 *       500:
 *         description: Internal server error.
 */

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

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /planner/add/{activityId}/to/{plannerId}:
 *   put:
 *     summary: add a planner to an activity
 *     tags: 
 *          - admin
 *          - user
 *     description: Add an existing activity to an existing planner.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: An activity.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Activity'
 *       403:
 *         description: Unauthorized. Only admins or users can access this route.
 *       500:
 *         description: Internal server error.
 */

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