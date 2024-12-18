import { User } from '../../model/User';
import { Post } from '../../model/Post';
import { Planner } from '../../model/Planner';

describe('User Model', () => {
    test('should create a User instance', () => {
        const user = new User({
            id: 1,
            name: 'John Doe',
            username: 'johndoe',
            email: 'john@example.com',
            password: 'password123',
            role: 'user',
            posts: [],
            planners: [],
        });

        expect(user.id).toBe(1);
        expect(user.name).toBe('John Doe');
        expect(user.username).toBe('johndoe');
        expect(user.email).toBe('john@example.com');
        expect(user.password).toBe('password123');
        expect(user.role).toBe('user');
        expect(user.posts).toEqual([]);
        expect(user.planners).toEqual([]);
    });

    test('should throw an error if required fields are missing', () => {
        expect(() => {
            new User({
                name: '',
                username: '',
                email: '',
                password: '',
                role: 'user',
                posts: [],
                planners: [],
            });
        }).toThrow('Name is required');

        expect(() => {
            new User({
                name: 'John Doe',
                username: '',
                email: '',
                password: '',
                role: 'user',
                posts: [],
                planners: [],
            });
        }).toThrow('Username is required');

        expect(() => {
            new User({
                name: 'John Doe',
                username: 'johndoe',
                email: '',
                password: '',
                role: 'user',
                posts: [],
                planners: [],
            });
        }).toThrow('User email is required');

        expect(() => {
            new User({
                name: 'John Doe',
                username: 'johndoe',
                email: 'john@example.com',
                password: '',
                role: 'user',
                posts: [],
                planners: [],
            });
        }).toThrow('User password is required');
    });

    test('should create a User instance from Prisma data', () => {
        const prismaUser = {
            id: 1,
            name: 'John Doe',
            username: 'johndoe',
            email: 'john@example.com',
            password: 'password123',
            role: 'user',
            posts: [],
            planners: [],
        };

        const user = User.from(prismaUser);

        expect(user.id).toBe(1);
        expect(user.name).toBe('John Doe');
        expect(user.username).toBe('johndoe');
        expect(user.email).toBe('john@example.com');
        expect(user.password).toBe('password123');
        expect(user.role).toBe('user');
        expect(user.posts).toEqual([]);
        expect(user.planners).toEqual([]);
    });
});
