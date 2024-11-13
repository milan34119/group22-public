import {
    User as UserPrisma,
    Post as PostPrisma,
    User,
} from '@prisma/client';

export class Post {
    id: number;
    title: string;
    content: string;
    createdAt?: Date;
    location?: string;

    constructor(post: {id?: number, title: string, content: string, createdAt?: Date,location?: string}) {
        this.validate(post);

        this.id = post.id;
        this.title = post.title;
        this.content = post.content;
        this.createdAt = post.createdAt;
        this.location = post.location;
    }

    validate(post: { id?: number; title: string; content: string }) {
        if (!post.title) {
            throw new Error('Post title is required');
        }
        if (!post.content) {
            throw new Error('Post content is required');
        }
    }

    static from({
        id,
        title,
        content,
        createdAt,
        location,
        
    }:PostPrisma ) {
        const test = createdAt
        return new Post({
            id,
            title,
            content,
            createdAt,
            location
        })
    }
}

// export class extendedPost extends Post {
//     user: User

//     constructor(post: {id?: number, title: string, content: string, createdAt: Date,location: string, user: User}) {
//         super(post);
//         this.user = post.user
//     }
//     static from({
//         id,
//         title,
//         content,
//         createdAt,
//         location,
//         user
        
//     }:PostPrisma & {user: UserPrisma} ) {
//         return new extendedPost({
//             id,
//             title,
//             content,
//             createdAt,
//             location,
//             user
//         })
//     }
// }
