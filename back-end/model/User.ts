import { th } from "date-fns/locale";
import { Post } from "./Post";
import {
    User as UserPrisma,
    Post as PostPrisma,
} from '@prisma/client';

export class User {
    id: number;
    name: string;
    email: string;
    password: string;
    posts: Post[];

    constructor(user : {id: number, name: string, email: string, password: string, posts: Post[]}) {
        this.validate(user);

        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.posts = user.posts;
    }

    validate(user: {name: string, email: string, password: string}) {
        if (!user.name){
            throw new Error("User name is required")
        }
        if (!user.email){
            throw new Error("User email is required")
        }
        if (!user.password){
            throw new Error("User password is required")
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getEmail(): string{
        return this.email;
    }

    getActivities(): Post[] {
        return this.posts;
    }

    // we dont want to just return the password to outside of this object, that sounds dangerous
    matchPassword(password: string): boolean {
        return password === this.password;
    }

    addPost(post: Post): Post {
        this.posts.push(post);
        return post;
    }

    static from({
        id,
        name,
        email,
        password,
        posts,
    }: UserPrisma & {posts: PostPrisma[]}) {
        return new User({
            id,
            name, 
            email,
            password,
            posts: posts.map((post) => Post.from(post))
        });
    }
}

