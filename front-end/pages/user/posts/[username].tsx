// import Header from '@components/Header';
// import PostOverviewTable from '@components/posts/PostOverviewTable';
// import { Post, User } from '@types';
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import UserService from 'service/UserService';
// import withAuth from 'util/withAuth';

// const ReadUserByUsername = () => {
//     const [user, setUser] = useState<User | null>(null);
//     const [posts, setPosts] = useState<Array<Post>>([]);
//     const router = useRouter();
//     const { username } = router.query;

//     const getUserByUsername = async () => {
//         const userResponse = await UserService.getUserByUsername(username as string);
//         if (userResponse.status === 400) return;
//         setUser(await userResponse.json());
//     };

//     useEffect(() => {
//         if (username) {
//             getUserByUsername()
//         };
//     }, [username]);

//     useEffect(() => {
//         if (user) {
//             const userPosts = user.posts
//             setPosts(userPosts)
//         }
//     }, [user])

//     return (
//         <>
//             <Header/>
//             <main className="d-flex flex-column justify-content-center align-items-center">
//                 <section>
//                     <h1>Your posts</h1>
//                 </section>

//                 {posts && <PostOverviewTable posts={posts} />}
//             </main>
//         </>
//     );
// };

// export default withAuth(ReadUserByUsername);

import Header from '@components/Header';
import PostOverviewTable from '@components/posts/PostOverviewTable';
import { Post, User } from '@types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import UserService from 'service/UserService';
import withAuth from 'util/withAuth';
import { Box, CircularProgress, Typography, Paper, Stack } from '@mui/material';

const ReadUserByUsername = () => {
    const [user, setUser] = useState<User | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { username } = router.query;

    useEffect(() => {
        const fetchUserAndPosts = async () => {
            if (!username) return;

            try {
                setLoading(true);
                setError(null);
                const response = await UserService.getUserByUsername(username as string);

                if (!response.ok) {
                    setError('Failed to fetch user data. Please try again.');
                    return;
                }

                const userData = await response.json();
                setUser(userData);
                setPosts(userData.posts || []);
            } catch (err) {
                setError('An unexpected error occurred.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserAndPosts();
    }, [username]);

    return (
        <>
            <Header />
            <Box
                sx={{
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                }}
            >
                <Paper elevation={3} sx={{ width: '100%', maxWidth: 800, p: 3 }}>
                    <Typography variant="h4" gutterBottom align="center">
                        User Information
                    </Typography>

                    {loading && (
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <CircularProgress />
                        </Box>
                    )}

                    {error && (
                        <Typography color="error" align="center">
                            {error}
                        </Typography>
                    )}

                    {!loading && !error && user && (
                        <Stack spacing={2}>
                            <Box>
                                <Typography variant="h6">Username</Typography>
                                <Typography>{user.username}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="h6">Email</Typography>
                                <Typography>{user.email}</Typography>
                            </Box>
                        </Stack>
                    )}
                </Paper>

                <Paper elevation={3} sx={{ width: '100%', maxWidth: 800, p: 3 }}>
                    <Typography variant="h4" gutterBottom align="center">
                        User Posts
                    </Typography>

                    {!loading && !error && posts.length > 0 && <PostOverviewTable posts={posts} />}

                    {!loading && !error && posts.length === 0 && (
                        <Typography align="center">No posts available for this user.</Typography>
                    )}
                </Paper>
            </Box>
        </>
    );
};

export default withAuth(ReadUserByUsername);
