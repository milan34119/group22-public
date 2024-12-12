import { error } from 'console';
import { Post } from '../model/Post';
import { User } from '../model/User';
import userDb from '../repository/user.db';
import { AuthenticationResponse, UserInput } from '../types';
import bcrypt from 'bcrypt';
import { generateJwtToken } from '../util/jwt';
const getAllUsers = async (): Promise<User[]> => await userDb.getAllUsers();

const getUserById = async (id: number): Promise<User> => {
    const user = await userDb.getUserById(id);
    if (!user) throw new Error(`User with id ${id} does not exist.`);
    return user;
};

const getUserByUsername = async ({ username }: { username: string }): Promise<User> => {
    const user = await userDb.getUserByUsername({ username });
    if (!user) {
        throw new Error(`user met username ${username} is niet gevonden.`);
    }
    return user;
};

// const getAllUserActivitiesById = async (id: number): Promise<Post[]> => {
//     return userDb.getAllUserPostsById({ id });
// };

// const addUser = async ({
//     name,
//     email,
//     password,
//     role,
// }: UserInput): Promise<User> => {
//     if ((await getAllUsers()).some((existingUser) => existingUser.email == email))
//         throw new Error('User with that email already exists.');
//     const user = new User({name, email, password, role, posts: [], planners:[]})
//     return await userDb.addUser(user);
// };

const authenticate = async ({ username, password }: UserInput): Promise<AuthenticationResponse> => {
    const user = await getUserByUsername({ username });

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        throw new Error('fout wachtwoord');
    }

    return {
        token: generateJwtToken({ username }),
        username,
        name: user.name,
    };
};
const createUser = async ({ name, username, email, password, role }: UserInput): Promise<User> => {
    const existingUser = await userDb.getUserByEmailAndUsername({ email, username });
    if (existingUser) {
        throw new Error('A user with this email/username already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
        name,
        username,
        email,
        password: hashedPassword,
        role,
        posts: [],
        planners: [],
    });
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
    createUser,
    login,
    authenticate,
};
