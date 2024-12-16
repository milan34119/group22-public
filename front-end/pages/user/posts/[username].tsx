import Header from '@components/Header';
import PostOverviewTable from '@components/posts/PostOverviewTable';
import { Post, User } from '@types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import UserService from 'service/UserService';
import withAuth from 'util/withAuth';

const ReadUserByUsername = () => {
    const [user, setUser] = useState<User | null>(null);
    const [posts, setPosts] = useState<Array<Post>>([]);
    const router = useRouter();
    const { username } = router.query;

    const getUserByUsername = async () => {
        const userResponse = await UserService.getUserByUsername(username as string);
        if (userResponse.status === 400) return;
        setUser(await userResponse.json());
    };

    useEffect(() => {
        if (username) {
            getUserByUsername()
        };
    }, [username]);

    useEffect(() => {
        if (user) {
            const userPosts = user.posts
            setPosts(userPosts)
        }
    }, [user])

    return (
        <>
            <Header/>
            <main className="d-flex flex-column justify-content-center align-items-center">
                <section>
                    <h1>Your posts</h1>
                </section>

                {posts && <PostOverviewTable posts={posts} />}
            </main>
        </>
    );
};

export default withAuth(ReadUserByUsername);
