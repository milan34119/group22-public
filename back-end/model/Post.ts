import {
    User as UserPrisma,
    Post as PostPrisma,
} from '@prisma/client';

export class Post {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    location: string | null;

    constructor(post: {id: number, title: string, content: string, createdAt: Date,location: string | null}) {
        this.validate(post);

        this.id = post.id;
        this.title = post.title;
        this.content = post.content;
        this.createdAt = post.createdAt;
        this.location = post.location;
    }

    validate(post: { id: number; title: string; content: string }) {
        if (!post.id) {
            throw new Error('Post ID is required');
        }
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
        return new Post({
            id,
            title,
            content,
            createdAt,
            location
        })
    }
}
