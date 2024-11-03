import { Post } from "../model/Post";
import { User } from "../model/User";
import userDb from "../repository/user.db";

const getAllUsers = (): User[] => userDb.getAllUsers();

const getUserById = (id: number): User => {
    const user = userDb.getUserById({ id });
    if (!user) throw new Error(`User with id ${id} does not exist.`);
    return user;
};

const getAllUserActivitiesById = (id: number) : Post[] => {
    return userDb.getAllUserActivitiesById({id})
}

const addActivityToUserById = (post: Post, id: number): Post => {
    return userDb.addActivityToUserById({post, id});
}

const addUser = (user: {id: number, name: string, email: string, password: string}): User => {
    if (getAllUsers().some(existingUser => existingUser.getEmail() == user.email)) throw new Error("User with that email already exists.");
    return userDb.addUser(user);
}

const login = ({email, password}: {email: string, password: string}): User => {
    const user = userDb.getUserByEmailAndPassword({email, password});
    if (!user) throw new Error("No user with that email and password exists");
    return user;
}


export default { 
    getAllUsers, 
    getUserById, 
    getAllUserActivitiesById,
    addActivityToUserById,
    addUser,
    login,
};
