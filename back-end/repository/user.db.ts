import { get } from 'http';
import { Post } from '../model/Post';
import { User } from '../model/User';
import database from '../util/database';
import { tr } from 'date-fns/locale';
import { Activity } from '../model/Activity';

const getAllUsers = async (): Promise<User[]> => {
    const prismaUsers = await database.user.findMany({
        include: {
            planners: {include: {activities: {include: {location: true}}}},
            posts: {include: {activity: {include: {location: true}}}},
        }});
    return Promise.all(prismaUsers.map((user) => User.from(user)))
};

const getUserById = async (id: number): Promise<User> => {
    try {
        const prismaUser = await database.user.findUnique({
            where: {id},
            include: {
                planners: {include: {activities: {include: {location: true}}}},
                posts: {include: {activity: {include: {location: true}}}},
            }
        })
        if(!prismaUser) throw new Error("no user with that id");
        return User.from(prismaUser)
    } catch (error) {
        console.error(error);
        throw new Error('Database error when getting user by id. See server log for details.');
    }
};

const addUser = async ({name, email, password, role}: User): Promise<User> => {
    const prismaUser = await database.user.create({
        data: {
            name,
            email,
            password,
            role
        },
        include: {
            planners: {include: {activities: {include: {location: true}}}},
            posts: {include: {activity: {include: {location: true}}}},
        }
    });
    if(!prismaUser) throw new Error("database error when creating a new user");
    return User.from(prismaUser);
};

const getUserByEmailAndPassword = async ({email,password,}: {email: string, password: string}): Promise<User|null> => {
    const prismaUser = await database.user.findFirst({
        where: {
            email,
            password
        },
        include: {
            planners: {include: {activities: {include: {location: true}}}},
            posts: {include: {activity: {include: {location: true}}}},
        }
    });
    if(!prismaUser) return null;
    return User.from(prismaUser)
};

export default {
    getAllUsers,
    getUserById,
    addUser,
    getUserByEmailAndPassword,
};
