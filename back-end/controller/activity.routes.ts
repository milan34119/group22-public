import express, { NextFunction, Request, Response } from 'express';
import ActivityService from '../service/Activity.service';
import { ActivityInput } from '../types';

const activityRouter = express.Router();


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /activity/{id}:
 *   get:
 *     summary: Get activity by Id
 *     tags: 
 *          - admin
 *          - user
 *     description: Get a specific activity based on a given Id.
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

activityRouter.get('/:id', async (req: Request & { auth: any }, res: Response, next: NextFunction) => {
    try {
        if (req.auth.role != 'admin' && req.auth.role != 'user') throw new Error('logged in user may not be a guest');

        const activityId = parseInt(req.params.id)
        const result = await ActivityService.getActivity(activityId);
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
 * /activity:
 *   post:
 *     summary: Post new activity
 *     tags: 
 *          - admin
 *          - user
 *     description: Create a new Activity.
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

activityRouter.post('/', async (req: Request & { auth: any }, res: Response, next: NextFunction) => {
    try {
        if (req.auth.role != 'admin' && req.auth.role != 'user') throw new Error('logged in user may not be a guest');

        const activityInput = <ActivityInput>req.body;
        const result = await ActivityService.createActivity(activityInput);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

export { activityRouter }