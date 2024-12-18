import Header from '@components/Header';
import PostOverviewTable from '@components/posts/PostOverviewTable';
import { Planner, Post, User } from '@types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import UserService from 'service/UserService';
import withAuth from 'util/withAuth';
import { Box, CircularProgress, Typography, Paper, Stack } from '@mui/material';
import Grid from '@mui/material/Grid2'
import ProfileInfoBox from '@components/users/profileInfo';
import DisplayPost from '@components/posts/Post';
import DisplayPlanner from '@components/planners/Planner';

const UserProfile = () => {
    const [user, setUser] = useState<User | null>(null);
    const [displayWhat, setDisplaywhat] = useState<string>("")
    const [posts, setPosts] = useState<Post[]>([]);
    const [planners, setPlanners] = useState<Planner[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { username } = router.query;

    useEffect(() => {
        const fetchUserAndData = async () => {
            if (!username) return;

            try {
                setLoading(true);
                setError(null);
                const response = await UserService.getUserByUsername(username as string);

                if (!response.ok) {
                    setError('Failed to fetch user data. Please try again.');
                    return;
                }

                const userData = await response.json() as User;
                setUser(userData);
                setPosts(userData.posts || []);
                setPlanners(userData.planners || []);
            } catch (err) {
                setError('An unexpected error occurred.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserAndData();
    }, [username]);

    return (
        <>
            <Header/>
            {user && <ProfileInfoBox user={user} setDisplayWhat={setDisplaywhat}/>}

            { displayWhat == "posts" &&      
             <Grid container spacing={2} padding={2}>
                {posts.map((post) => (
                <Grid size={6}>    
                    <Paper elevation={3} sx={{p: 3 }}>
                        <DisplayPost key={post.id} post={post} displayIcons={false}/>
                    </Paper>
                </Grid>
                ))}
            </Grid>} 

            { displayWhat == "planners" &&      
             <Grid container spacing={2} padding={2}>
                {planners.map((planner) => (
                <Grid size={6}>    
                    <Paper elevation={3} sx={{p: 3 }}>
                        <DisplayPlanner key={planner.id} planner={planner} displayIcons={false}/>
                    </Paper>
                </Grid>
                ))}
            </Grid>}
        </>
    );
};

export default withAuth(UserProfile);