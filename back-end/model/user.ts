export class User {
    id: number;
    name: string;
    email: string;
    password: string;
    // profile: UserProfile | null;
    posts: Post[];

    constructor(id: number, name: string, email: string, password: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        // this.profile = null;
        this.posts = [];
    }
}
