import UserService from '../service/User.service';
import express, { NextFunction, Request, Response } from 'express';
import { LoginInput, PostInput, UserInput } from '../types';
import { Post } from '../model/Post';

const userRouter = express.Router();

/**
 * @swagger
 * /user/allUsers:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Get all users from the database.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error.
 */

userRouter.get('/', async (req: Request, res: Response) => {
    try {
        const allUsers = await UserService.getAllUsers();
        res.status(200).json(allUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching users' });
    }
});

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     description: Get a user from the database using their unique ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A user object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserService.getUserById(Number(req.params.id));
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

userRouter.get('/:id/activities', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserService.getAllUserActivitiesById(Number(req.params.id));
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

// userRouter.post('/:id/activity', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const post = <PostInput>req.body;
//         const result = await UserService.addActivityToUserById(post, Number(req.params.id));
//         res.status(200).json(result);
//     } catch (error) {
//         next(error);
//     }
// });

userRouter.post('/:id/activity', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, title, content, location } = req.body as PostInput;
        const post = new Post(id, title, content, location);
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

// userRouter.get('/register', async(req: Request, res: Response, next: NextFunction) => {
//     try {

//     }
// })

export { userRouter };
