export class Post {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    location: string | null;

    constructor(id: number, title: string, content: string, location: string | null = null) {
        this.validate({ id, title, content });

        this.id = id;
        this.title = title;
        this.content = content;
        this.createdAt = new Date();
        this.location = location;
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
}
