import { get } from 'http';
import { Post } from '../model/Post';
import { User } from '../model/User';

const users: User[] = [];

const testUser = new User({ id: 1, name: 'Test', email: 'test@email.com', password: 'PASSWORD' });
const testPost = new Post(1, 'Title', 'Content', 'Location');
testUser.addPost(testPost);
users.push(testUser);

const anotherUser = new User({
    id: 2,
    name: 'Another User',
    email: 'another@email.com',
    password: 'ANOTHER_PASSWORD',
});
const anotherPost = new Post(2, 'Another Title', 'Another Content', 'Another Location');
anotherUser.addPost(anotherPost);
users.push(anotherUser);

const getAllUsers = (): User[] => users;

const getUserById = ({ id }: { id: number }): User | null => {
    try {
        return users.find((user) => user.getId() === id) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getAllUserActivitiesById = ({ id }: { id: number }): Post[] => {
    const user = getUserById({ id });
    if (user == null) throw new Error('user does not exist');
    return user.getActivities();
};

const addActivityToUserById = ({ post, id }: { post: Post; id: number }): Post => {
    const user = getUserById({ id });
    if (user == null) throw new Error('user does not exist');
    return user.addPost(post);
};

const addUser = ({
    id,
    name,
    email,
    password,
}: {
    id: number;
    name: string;
    email: string;
    password: string;
}): User => {
    const user = new User({ id, name, email, password });
    users.push(user);
    return user;
};

const getUserByEmailAndPassword = ({
    email,
    password,
}: {
    email: string;
    password: string;
}): User | null => {
    return users.find((user) => user.getEmail() === email && user.matchPassword(password)) || null;
};

export default {
    getAllUsers,
    getUserById,
    getAllUserActivitiesById,
    addActivityToUserById,
    addUser,
    getUserByEmailAndPassword,
};
