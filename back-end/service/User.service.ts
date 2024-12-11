import { Post } from '../model/Post';
import { User } from '../model/User';
import userDb from '../repository/user.db';
import { UserInput } from '../types';

const getAllUsers = async (): Promise<User[]> => await userDb.getAllUsers();

const getUserById = async (id: number): Promise<User> => {
    const user = await userDb.getUserById(id);
    if (!user) throw new Error(`User with id ${id} does not exist.`);
    return user;
};

// const getAllUserActivitiesById = async (id: number): Promise<Post[]> => {
//     return userDb.getAllUserPostsById({ id });
// };

const addUser = async ({
    name,
    email,
    password,
    role,
}: UserInput): Promise<User> => {
    if ((await getAllUsers()).some((existingUser) => existingUser.email == email))
        throw new Error('User with that email already exists.');
    const user = new User({name, email, password, role, posts: [], planners:[]})
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
    addUser,
    login,
};
