import express, {Request, Response} from 'express';
import PostService from '../service/Post.service';

const postRouter = express.Router();

postRouter.get('/', async (req:Request & {auth: any}, res: Response) => {
    try {
        const response = await PostService.getAllPosts()

        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({status: 'error', errorMessage: error.message});
    }
})

export default postRouter;