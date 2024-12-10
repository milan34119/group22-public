import { User } from "@prisma/client"
import { Post } from "../model/Post"
import database from "../util/database"

const getAllPosts = async (): Promise<Post[]> => {
    const prismaPosts = await database.post.findMany({
        include: {activity: {include: {location: true}} }
    })
    return Promise.all(prismaPosts.map((post) => Post.from(post)))
}

const createNewPostForUserByUid = async ({name, description, comments, activity, userId}: Post & {userId: number}): Promise<Post> => {
    const prismaPost = await database.post.create({
        data: {
            name, 
            description,
            comments,    
            activity: {
                connect: {id: activity.id}
            },
            user: {
                connect: {id: userId}
            }  
        },
        include: {activity: {include: {location: true}} }
    });
    if(!prismaPost) throw new Error("post not successfully created");
    return Post.from(prismaPost)
};

export default{
    getAllPosts,
    createNewPostForUserByUid,
}