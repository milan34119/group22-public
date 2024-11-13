import { get } from 'http';
import { Post } from '../model/Post';
import { User, extendedUser } from '../model/User';
import database from '../util/database';
import { tr } from 'date-fns/locale';

const getAllUsers = async (): Promise<extendedUser[]> => {
    const prismaUsers = await database.user.findMany({include: {posts: true}});
    return Promise.all(prismaUsers.map((user) => extendedUser.from(user)))
};

const getUserById = async ({ id }: { id: number }): Promise<extendedUser> => {
    try {
        const prismaUser = await database.user.findUnique({
            where: {id: id},
            include: { posts: true}
        })
        if(!prismaUser) throw new Error("no user with that id");
        return extendedUser.from(prismaUser)
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getAllUserPostsById = async ({ id }: { id: number }): Promise<Post[]> => {
    const user = await getUserById({ id });
    if (!user) throw new Error('user with that id does not exist');
    return user.getPosts();
};

const addPostToUserById = async ({ post, id }: { post: Post; id: number }): Promise<Post> => {
    const createdPrismaPost = await database.post.create({
        data: post
    });
    if(!createdPrismaPost) throw new Error("post not successfully created");
    const createdPost = Post.from(createdPrismaPost)
    const updatedPrismaUser = await database.user.update({
        where: {id: id},
        data: {
            posts: {
                connect: {id: createdPost.id}
            }
        }
    })
    if(!updatedPrismaUser) throw new Error("Post not correctly added to user");
    return createdPost;
};

const addUser = async ({name, email, password}: {name: string, email: string, password: string}): Promise<extendedUser> => {
    const prismaUser = await database.user.create({
        data: {
            name,
            email,
            password
        },
        include: {
            posts: true
        }
    });
    if(!prismaUser) throw new Error("database error when creating a new user");
    return extendedUser.from(prismaUser);
};

const getUserByEmailAndPassword = async ({email,password,}: {email: string; password: string;}): Promise<extendedUser|null> => {
    const prismaUser = await database.user.findFirst({
        where: {
            email,
            password
        },
        include: {
            posts: true
        }
    });
    if(!prismaUser) return null;
    return extendedUser.from(prismaUser)
};

export default {
    getAllUsers,
    getUserById,
    getAllUserPostsById,
    addPostToUserById,
    addUser,
    getUserByEmailAndPassword,
};
