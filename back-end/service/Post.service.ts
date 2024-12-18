import { Post } from "../model/Post";
import postDb from "../repository/post.db";
import ActivityDb from "../repository/Activity.db";
import { PostInput } from "../types";
import UserService from "./User.service";
import ActivityService from "./Activity.service";

const getPostById = async (id:number):Promise<Post> => {
    const post = await postDb.getPostById(id)
    if(!post) throw new Error("no post with that id.")
    return post
}

const getAllPosts = async ():Promise<Post[]> => {
    return await postDb.getAllPosts();
}

const createPostForUserByUsername = async ({
    name, 
    description, 
    activity:ActivityInput,
}:PostInput, userName: string):Promise<Post> => {
    const activity =   await ActivityService.getActivity(ActivityInput.id);
    const post = new Post({name, description, activity, comments:[]})
    return await postDb.createPostForUserByUsername(post, userName)
}
const addCommentToPost = async (comment:string, id:number):Promise<Post> => {
    const postComments = (await getPostById(id)).comments
    const updatedcomments = [...postComments, comment]
    return await postDb.updatePostComments(updatedcomments, id);
}

export default{
    // addActivityToUserById,
    getAllPosts,
    createPostForUserByUsername,
    addCommentToPost,

}