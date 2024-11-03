export class Post {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    location: string | null;

    constructor(
        id: number,
        title: string,
        content: string,
        location: string | null = null
    ) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.createdAt = new Date();
        this.location = location;
    }
}
