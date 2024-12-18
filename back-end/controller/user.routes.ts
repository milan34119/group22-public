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
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /user:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Get all users from the database.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       403:
 *         description: Unauthorized. Only admins can access this route.
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
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: Unauthorized. Authentication required.
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

/**
 * @swagger
 * /user/username/{username}:
 *   get:
 *     summary: Gebruiker ophalen op basis van gebruikersnaam
 *     description: Haalt een gebruiker op uit de database met behulp van de unieke gebruikersnaam.
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: De unieke gebruikersnaam van de op te halen gebruiker.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Een gebruikersobject.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Gebruiker niet gevonden.
 *       500:
 *         description: Interne serverfout.
 */
userRouter.get('/username/:username', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const username = req.params.username;
        const user = await UserService.getUserByUsername({ username });
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /user/{username}/activities:
 *   get:
 *     summary: Activiteiten van een gebruiker ophalen
 *     description: Haalt alle activiteiten op die zijn gekoppeld aan een specifieke gebruiker via de gebruikersnaam.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: De gebruikersnaam van de gebruiker wiens activiteiten moeten worden opgehaald.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Een lijst van activiteiten voor de gebruiker.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Activity'
 *       401:
 *         description: Unauthorized. Authentication required.
 *       404:
 *         description: Gebruiker niet gevonden.
 *       500:
 *         description: Interne serverfout.
 */
userRouter.get('/:username/activities', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserService.getAllUserActivitiesByUsername(String(req.params.username));
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

// userRouter.get('/:id/activities', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const user = await UserService.getAllUserActivitiesById(Number(req.params.id));
//         res.status(200).json(user);
//     } catch (error) {
//         next(error);
//     }
// });

// userRouter.post('/:id/activity', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const post = <PostInput>req.body;
//         const result = await UserService.addActivityToUserById(post, Number(req.params.id));
//         res.status(200).json(result);
//     } catch (error) {
//         next(error);
//     }
// });

/**
 * @swagger
 * /user/{id}/post:
 *   post:
 *     summary: Post toevoegen aan gebruiker
 *     description: Voegt een nieuwe post toe aan een specifieke gebruiker met behulp van de gebruikers-ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: De unieke ID van de gebruiker waaraan de post wordt toegevoegd.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostInput'
 *     responses:
 *       200:
 *         description: Post succesvol toegevoegd.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       401:
 *         description: Unauthorized. Authentication required.
 *       400:
 *         description: Ongeldige invoergegevens.
 *       500:
 *         description: Interne serverfout.
 */
userRouter.post('/:id/post', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const post = <PostInput>req.body;
        const id = Number(req.params.id);
        const result = await PostService.addActivityToUserById(post, id);
        res.status(200).json(result);
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
 *               username:
 *                 type: string
 *                 example: "Johndoeusername"
 *                 description: "De username van de gebruiker. Moet uniek zijn"
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
 *               - username
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
 *                 username:
 *                   type: string
 *                   example: "johndoeusername"
 *                   description: "naam vd aangemaakte gebruiker."
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

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Gebruiker authenticeren
 *     description: Authenticatie-eindpunt voor gebruikers om in te loggen.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "johndoeusername"
 *                 description: "De username van de gebruiker."
 *               password:
 *                 type: string
 *                 example: "wachtwoord123"
 *                 description: "Het wachtwoord van de gebruiker."
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Authenticatie succesvol.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Auth succesvol"
 *                 token:
 *                   type: string
 *                   description: "Authenticatietoken"
 *       400:
 *         description: Ongeldige inloggegevens.
 *       500:
 *         description: Interne serverfout.
 */
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;
        const response = await UserService.authenticate(userInput);
        res.status(200).json({ message: 'Auth succesful', ...response });
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Gebruiker verwijderen
 *     description: Verwijdert een gebruiker uit het systeem. Alleen beschikbaar voor beheerders.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: De unieke ID van de te verwijderen gebruiker.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Gebruiker succesvol verwijderd.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Bevestigingsbericht van verwijdering
 *       401:
 *         description: Unauthorized. Authentication required.
 *       403:
 *         description: Geen toestemming. Alleen beheerders kunnen gebruikers verwijderen.
 *       500:
 *         description: Interne serverfout.
 */
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
