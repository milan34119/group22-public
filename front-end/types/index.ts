export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    posts: Post[];
};

export type Post = {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    location: string | null;
};

export type StatusMessage = {
    message: string;
    type: 'error' | 'success';
};
