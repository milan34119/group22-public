import { Post } from "../model/Post";
import postDb from "../repository/post.db";
import ActivityDb from "../repository/Activity.db";
import { PostInput } from "../types";
import UserService from "./User.service";
import ActivityService from "./Activity.service";

// const addActivityToUserById = async ({
//     name,
//     description,
//     comments,
//     activity
// }: PostInput, id: number): Promise<Post> => {
//     const gotActivity = await ActivityDb.getActivity(activity.id)
//     const post = new Post({name, description, comments, activity: gotActivity})
//     return await postDb.createNewPostForUserByUid(post, id);
// };

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

export default{
    // addActivityToUserById,
    getAllPosts,
    createPostForUserByUsername
}