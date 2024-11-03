type PostInput = {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    location: string | null;
}

type UserInput = {
    id: number;
    name: string;
    email: string;
    password: string;
}

type LoginInput = {
    email: string;
    password: string;
}

export {
    PostInput,
    UserInput,
    LoginInput,
}