type PostInput = {
    id?: number;
    name: string;
    description?: string;
    comments: string[];
    activity?: ActivityInput;
}

type UserInput = {
    id?: number;
    name: string;
    email: string;
    password: string;
    role: string;
    posts?: PostInput[];
    planners?: PlannerInput[];
}

type PlannerInput = {
    id?: number;
    name: string;
    description?: string;
    activities?: ActivityInput[]
}

type ActivityInput = {
    id?: number;
    name: string;
    description?: string;
    location?: LocationInput
}

type LocationInput = {
    id?: number;
    name: string;
    description?: string;
}

type LoginInput = {
    email: string;
    password: string;
}

export {
    PostInput,
    UserInput,
    ActivityInput,
    LocationInput,
    PlannerInput,
    LoginInput,
}