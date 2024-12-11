import { Post } from "../model/Post";
import postDb from "../repository/post.db";
import ActivityDb from "../repository/Activity.db";
import { PostInput } from "../types";
import UserService from "./User.service";

const addActivityToUserById = async ({
    name,
    description,
    comments,
    activity
}: PostInput, id: number): Promise<Post> => {
    const gotActivity = await ActivityDb.getActivityById(activity.id)
    const post = new Post({name, description, comments, activity: gotActivity})
    return await postDb.createNewPostForUserByUid(post, id);
};

export default{
    addActivityToUserById,
}