import PostOverviewTable from '@components/posts/PostOverviewTable';
import { Post, User } from '@types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import UserService from 'service/UserService';

const ReadUserByUsername = () => {
    const [user, setUser] = useState<User | null>(null);

    const router = useRouter();
    const { username } = router.query;

    const getUserByUsername = async () => {
        const userResponse = await UserService.getUserByUsername(username as string);
        if (userResponse.status === 400) return;
        setUser(await userResponse.json());
    };

    useEffect(() => {
        if (username) getUserByUsername();
    }, [username]);

    const [posts, setPosts] = useState<Array<Post>>([]);

    const getAllUserActivitiesByUsername = async () => {
        const [userResponse] = await Promise.all([
            UserService.getAllUserActivitiesByUsername(username as string),
        ]);
        const [posts] = await Promise.all([userResponse.json()]);
        setPosts(posts);
    };

    useEffect(() => {
        if (username) getAllUserActivitiesByUsername();
    }, [username]);

    return (
        <>
            <main className="d-flex flex-column justify-content-center align-items-center">
                <section>
                    <h1>{user && user.username}'s profile</h1>
                </section>

                {posts && <PostOverviewTable posts={posts} />}
            </main>
        </>
    );
};

export default ReadUserByUsername;
