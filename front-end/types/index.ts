export type User = {
    id?: number;
    name: string;
    username: string;
    email: string;
    password: string;
    role: string;
    posts: Post[];
    planners: Planner[];
};

export type Post = {
    id?: number;
    name: string;
    description?: string;
    comments: string[];
    date: Date;
    activity: Activity;
};

export type Location = {
    id?: number;
    name: string;
    description?: string;
}

export type Activity = {
    id?: number;
    name: string;
    description?: string;
    location: Location;
}

export type Planner = {
    id?: number;
    name: string;
    description?: string;
    activities: Activity[]
}



export type StatusMessage = {
    message: string;
    type: 'error' | 'success';
};
