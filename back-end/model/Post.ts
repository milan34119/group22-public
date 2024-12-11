import {
    Post as PostPrisma,
    Activity as ActivityPrisma,
    Location as LocationPrisma,
} from '@prisma/client';
import { Activity } from './Activity';

export class Post {
    readonly id: number;
    readonly name: string;
    readonly description?: string;
    readonly comments: string[];
    readonly createdAt?: Date;
    readonly activity: Activity;

    constructor(post: {id?: number, name: string, description?: string, comments: string[] ,createdAt?: Date, activity: Activity}) {
        this.validate(post);

        this.id = post.id;
        this.name = post.name;
        this.description = post.description;
        this.comments = post.comments;
        this.createdAt = post.createdAt;
        this.activity = post.activity;
    }

    validate(post: {id?: number, name: string, description?: string, comments: string[] ,createdAt?: Date, activity: Activity}) {
        if (!post.name) {
            throw new Error('name is required for Post.');
        }
        if (!post.activity) {
            throw new Error("activity is required for Post.")
        }
    }

    static from({
        id,
        name,
        description,
        comments,
        activity
    }:PostPrisma & {activity: ActivityPrisma & {location:LocationPrisma} }) {
        return new Post({
            id,
            name,
            description,
            comments,
            activity: Activity.from(activity)
        })
    }
}