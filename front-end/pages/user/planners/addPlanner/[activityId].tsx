import Header from '@/components/Header';
import DisplayPlanner from '@/components/planners/Planner';
import { Button, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Activity, Planner, User } from '@/types';
import { useRouter } from 'next/router';
import { useDebugValue, useEffect, useState } from 'react';
import ActivityService from '@/service/ActivityService';
import PlannerService from '@/service/PlannerService';
import UserService from '@/service/UserService';
import withAuth from '@/util/withAuth';

const addActivityToPlanner = () => {
    const [activity, setActivity] = useState<Activity | null>(null);
    const [planners, setPlanners] = useState<Planner[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [username, setUsername] = useState('');
    const router = useRouter();
    const { activityId } = router.query;

    useEffect(() => {
        const username = localStorage.getItem('loggedInUser');
        setUsername(username ? username : '');
    }, []);

    useEffect(() => {
        const fetchActivity = async () => {
            if (!activityId) return;

            try {
                setLoading(true);
                const response = await ActivityService.getActivityById(
                    activityId as unknown as number
                );

                if (!response.ok) {
                    return;
                }

                const activityData = (await response.json()) as Activity;
                setActivity(activityData);
            } catch (err) {
            } finally {
                setLoading(false);
            }
        };

        fetchActivity();
    }, [activityId]);

    useEffect(() => {
        const fetchUserAndData = async () => {
            if (!username) return;

            try {
                const response = await UserService.getUserByUsername(username as string);

                if (!response.ok) {
                    return;
                }

                const userData = (await response.json()) as User;
                console.log(userData.planners);
                setPlanners(userData.planners || []);
            } catch (err) {
            } finally {
                setLoading(false);
            }
        };

        fetchUserAndData();
    }, [username]);

    const handeleClick = async (planner: Planner) => {
        if (!activity || !activity.id) return;
        if (!planner || !planner.id) return;

        const response = await PlannerService.addActivityToPlanner(activity.id, planner.id);

        if (response.status === 200) {
            const user = await response.json();

            router.push('/');
        }
    };

    return (
        <>
            <Header />
            {activity && planners && (
                <>
                    <Grid container spacing={2} padding={2}>
                        {planners.map((planner) => (
                            <Grid size={6}>
                                <Paper
                                    elevation={3}
                                    sx={{ p: 3, hover: 'red' }}
                                    onClick={() => handeleClick(planner)}
                                >
                                    <DisplayPlanner
                                        planner={planner}
                                        displayIcons={false}
                                    />
                                </Paper>
                            </Grid>
                        ))}
                        {(!planners || planners.length == 0) && (
                            <Typography>You don't seem to have any planners...</Typography>
                        )}
                    </Grid>
                </>
            )}
        </>
    );
};

export default withAuth(addActivityToPlanner);
