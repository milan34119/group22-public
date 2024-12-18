import express, {NextFunction, Request, Response} from 'express';
import PostService from '../service/Post.service';
import { CommentInput, PostInput } from '../types';

const postRouter = express.Router();

postRouter.get('/', async (req:Request, res: Response) => {
    try {
        const response = await PostService.getAllPosts()

        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({status: 'error', errorMessage: error.message});
    }
})

postRouter.post('/:username', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const plannerInput = <PostInput>req.body;
        const userName = req.params.username
        const result = await PostService.createPostForUserByUsername(plannerInput, userName)
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

postRouter.put('/addComment/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comment = (<CommentInput>req.body).comment;
        const id = parseInt(req.params.id)
        const response = await PostService.addCommentToPost(comment, id);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

export default postRouter;