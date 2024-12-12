import { th } from 'date-fns/locale';
import { Post } from './Post';
import { Planner } from './Planner';
import {
    User as UserPrisma,
    Post as PostPrisma,
    Planner as PlannerPrisma,
    Activity as ActivityPrisma,
    Location as LocationPrisma,
} from '@prisma/client';

export class User {
    readonly id: number;
    readonly name: string;
    readonly username: string;
    readonly email: string;
    readonly password: string;
    readonly role: string;
    readonly posts: Post[];
    readonly planners: Planner[];

    constructor(user: {
        id?: number;
        name: string;
        username: string;
        email: string;
        password: string;
        role: string;
        posts: Post[];
        planners: Planner[];
    }) {
        this.validate(user);

        this.id = user.id;
        this.name = user.name;
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
        this.posts = user.posts;
        this.planners = user.planners;
    }

    validate(user: {
        id?: number;
        name: string;
        username: string;
        email: string;
        password: string;
        role: string;
        posts: Post[];
        planners: Planner[];
    }) {
        if (!user.name) {
            throw new Error('Name is required');
        }
        if (!user.username) {
            throw new Error('Username is required');
        }
        if (!user.email) {
            throw new Error('User email is required');
        }
        if (!user.password) {
            throw new Error('User password is required');
        }
    }

    static from({
        id,
        name,
        username,
        email,
        password,
        role,
        posts,
        planners,
    }: UserPrisma & {
        planners: (PlannerPrisma & {
            activities: (ActivityPrisma & { location: LocationPrisma })[];
        })[];
    } & { posts: (PostPrisma & { activity: ActivityPrisma & { location: LocationPrisma } })[] }) {
        return new User({
            id,
            name,
            username,
            email,
            password,
            role,
            posts: posts.map((post) => Post.from(post)),
            planners: planners.map((planner) => Planner.from(planner)),
        });
    }
}
