import { User } from "@prisma/client"
import { Post } from "../model/Post"
import database from "../util/database"
import { Activity } from "../model/Activity"

const getAllPosts = async (): Promise<Post[]> => {
    const prismaPosts = await database.post.findMany({
        include: {activity: {include: {location: true}} }
    })
    return Promise.all(prismaPosts.map((post) => Post.from(post)))
}

const createPostForUserByUsername = async (post: {name: string, description?: string, comments: string[], activity: Activity}, username:string): Promise<Post> => {
    const prismaPost = await database.post.create({
        data: {
            name: post.name, 
            description: post.description,
            comments: post.comments,    
            activity: {
                connect: {id: post.activity.id}
            },
            user: {
                connect: {username}
            }  
        },
        include: {activity: {include: {location: true}} }
    });
    if(!prismaPost) throw new Error("post not successfully created");
    return Post.from(prismaPost)
};

const getPostById = async (id:number) => {
    try {
        const prismaPost = await database.post.findUnique({
            where: {
                id
            },
            include: {activity: {include: {location: true}} }
        });
        return Post.from(prismaPost)
    } catch(error) {
        console.error(error)
        throw new Error("Database error")
    }
}

const updatePostComments = async (updatedComments: string[], id:number):Promise<Post> => {
    try {
        const prismaPost = await database.post.update({
            where: {
                id
            },
            data: {
                comments: updatedComments
            },
            include: {activity: {include: {location: true}} }
        });
        return Post.from(prismaPost)
    } catch (error) {
        console.error(error)
        throw new Error("Database error")
    }
}

export default{
    getAllPosts,
    createPostForUserByUsername,
    getPostById,
    updatePostComments
}