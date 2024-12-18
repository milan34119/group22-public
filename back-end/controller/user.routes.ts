import UserService from '../service/User.service';
import express, { NextFunction, Request, Response } from 'express';
import { LoginInput, PostInput, UserInput, ActivityInput } from '../types';
import { Post } from '../model/Post';
import postDb from '../repository/post.db';
import { Activity } from '../model/Activity';
import { User } from '../model/User';
import PostService from '../service/Post.service';

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

userRouter.get('/', async (req: Request & { auth: any }, res: Response) => {
    try {
        if (req.auth.role != 'admin') throw new Error('logged in user must be an admin');
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

userRouter.get('/username/:username', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const username = req.params.username;
        const user = await UserService.getUserByUsername({username});
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

userRouter.get('/:username/activities', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserService.getAllUserActivitiesByUsername(String(req.params.username));
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /user/registration:
 *   post:
 *     summary: Registreer een nieuwe gebruiker
 *     description: Deze route maakt een nieuwe gebruiker aan in het systeem met de opgegeven gegevens.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *                 description: "De naam van de gebruiker."
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *                 description: "Het e-mailadres van de gebruiker. Moet uniek zijn."
 *               password:
 *                 type: string
 *                 example: "password123"
 *                 description: "Het wachtwoord van de gebruiker."
 *               role:
 *                 type: string
 *                 example: "user"
 *                 description: "De rol van de gebruiker. Bijvoorbeeld 'admin' of 'user'."
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *     responses:
 *       200:
 *         description: Gebruiker succesvol geregistreerd.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "1"
 *                   description: "De unieke ID van de aangemaakte gebruiker."
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *                   description: "De naam van de aangemaakte gebruiker."
 *                 email:
 *                   type: string
 *                   example: "johndoe@example.com"
 *                   description: "Het e-mailadres van de aangemaakte gebruiker."
 *                 role:
 *                   type: string
 *                   example: "user"
 *                   description: "De rol van de aangemaakte gebruiker."
 *       400:
 *         description: Ongeldige invoerdata. Bijvoorbeeld ontbrekende velden of onjuist e-mailadres.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid input data. Email must be unique."
 *       500:
 *         description: Interne serverfout.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An unexpected error occurred."
 */

userRouter.post('/registration', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;
        const result = await UserService.createUser(userInput);
        res.status(200).json({ message: 'Auth succesful', ...result });
    } catch (error) {
        next(error);
    }
});

// userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const login = <LoginInput>req.body;
//         const result = await UserService.login(login);
//         res.status(200).json(result);
//     } catch (error) {
//         next(error);
//     }
// });

userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;
        const response = await UserService.authenticate(userInput);
        res.status(200).json({ message: 'Auth succesful', ...response });
    } catch (error) {
        next(error);
    }
});

userRouter.delete('/:id', async (req: Request & { auth: any }, res: Response) => {
    try {
        if (req.auth.role != 'admin') throw new Error('logged in user must be an admin');
        const id = Number(req.params.id);
        const response = await UserService.deleteUser(id);
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'An error occurred while deleting a user' });
    }
});

export { userRouter };
