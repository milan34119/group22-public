import { Post } from '../model/Post';
import { User } from '../model/User';
import userDb from '../repository/user.db';

const getAllUsers = async (): Promise<User[]> => await userDb.getAllUsers();

const getUserById = async (id: number): Promise<User> => {
    const user = await userDb.getUserById({ id });
    if (!user) throw new Error(`User with id ${id} does not exist.`);
    return user;
};

const getAllUserActivitiesById = async (id: number): Promise<Post[]> => {
    return userDb.getAllUserPostsById({ id });
};

const addActivityToUserById = async (post: Post, id: number): Promise<Post> => {
    return await userDb.addPostToUserById({ post, id });
};

const addUser = async (user: {name: string; email: string; password: string }): Promise<User> => {
    if ((await getAllUsers()).some((existingUser) => existingUser.getEmail() == user.email))
        throw new Error('User with that email already exists.');
    return await userDb.addUser(user);
};

const login = async ({ email, password }: { email: string; password: string }): Promise<User> => {
    const user = await userDb.getUserByEmailAndPassword({ email, password });
    if (!user) throw new Error('No user with that email and password exists');
    return user;
};

export default {
    getAllUsers,
    getUserById,
    getAllUserActivitiesById,
    addActivityToUserById,
    addUser,
    login,
};
