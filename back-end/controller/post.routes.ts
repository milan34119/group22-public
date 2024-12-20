import express, {NextFunction, Request, Response} from 'express';
import PostService from '../service/Post.service';
import { CommentInput, PostInput } from '../types';

const postRouter = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /post:
 *   get:
 *     summary: Get all posts
 *     tags: 
 *          - admin
 *          - user
 *     description: get all existing posts.
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

postRouter.get('/', async (req: Request, res: Response) => {
    try {
        const response = await PostService.getAllPosts()

        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({status: 'error', errorMessage: error.message});
    }
})

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /post/{username}:
 *   post:
 *     summary: Get posts by username
 *     tags: 
 *          - admin
 *          - user
 *     description: Get all the posts that belong to a specific username.
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

postRouter.post('/:username', async (req: Request & { auth: any }, res: Response, next: NextFunction) => {
    try {
        if (req.auth.role != 'admin' && req.auth.role != 'user') throw new Error('logged in user may not be a guest');
        const plannerInput = <PostInput>req.body;
        const userName = req.params.username
        const result = await PostService.createPostForUserByUsername(plannerInput, userName)
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
 * /activity/addComment/{id}:
 *   get:
 *     summary: Add comment to post
 *     tags: 
 *          - admin
 *          - user
 *     description: Add a comment to a given Post If there are more than 3 comments, the oldest is removed.
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

postRouter.put('/addComment/:id', async (req: Request & { auth: any }, res: Response, next: NextFunction) => {
    try {
        if (req.auth.role != 'admin' && req.auth.role != 'user') throw new Error('logged in user may not be a guest');
        const comment = (<CommentInput>req.body).comment;
        const id = parseInt(req.params.id)
        const response = await PostService.addCommentToPost(comment, id);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

export default postRouter;