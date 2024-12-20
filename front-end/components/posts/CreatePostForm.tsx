import Head from 'next/head';
import { useRouter } from 'next/router';
import { Container, Box, Typography, TextField, Button, Link, Alert, Paper } from '@mui/material';
import PlannerService from '@/service/PlannerService';
import styles from '@/styles/home.module.css';
import { useEffect, useState } from 'react';
import { Activity, Location, Planner, Post, User } from '@/types';
import { t } from 'i18next';
import { setEngine } from 'crypto';
import DisplayActivity from '@/components/Activity/Activity';
import ActivityService from '@/service/ActivityService';
import LocationService from '@/service/LocationService';
import postService from '@/service/PostService';

type Props = {
    activity?: Activity;
};

const CreatePostForm: React.FC<Props> = ({ activity }: Props) => {
    const router = useRouter();

    const [postName, setPostName] = useState('');
    const [postDescription, setPostDescription] = useState('');

    const [activityName, setActivityName] = useState('');
    const [activityDescription, setActivityDescription] = useState('');
    const [locationName, setLocationName] = useState('');

    const [userName, setUsername] = useState('');

    const [postNameError, setPostNameError] = useState('');
    const [activityNameError, setActivityNameError] = useState('');
    const [locationError, setLocationError] = useState('');

    useEffect(() => {
        const username = localStorage.getItem('loggedInUser');
        setUsername(username ? username : '');
    }, []);

    const clearErrors = () => {
        setActivityNameError('');
    };

    const validate = (): boolean => {
        let result = true;

        if (!postName || postName.trim() === '') {
            setPostNameError('Name cannot be empty.');
            result = false;
        }

        if (!activity) {
            if (!activityName || activityName.trim() === '') {
                setActivityNameError('Name cannot be empty.');
                result = false;
            }
            if (!locationName || locationName.trim() === '') {
                setLocationError('Location cannot be empty.');
                result = false;
            }
        }

        return result;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        clearErrors();

        if (!validate()) {
            return;
        }

        let postActivity;
        if (activity) {
            postActivity = activity;
        } else {
            const location = (await (
                await LocationService.createLocation({ name: locationName })
            ).json()) as Location;
            const createdActivity = (await (
                await ActivityService.createActivity({
                    name: activityName,
                    description: activityDescription,
                    location,
                })
            ).json()) as Activity;

            postActivity = createdActivity;
        }

        const response = await postService.createPost(
            { name: postName, description: postDescription, activity: postActivity },
            userName
        );

        if (response.status === 200) {
            router.push('/');
        }
    };

    return (
        <>
            <Head children>
                <title>Create a new planner</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>

            <Paper sx={{ p: 3, m: 3 }}>
                <Typography component="h1" variant="h5">
                    Create a new post
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        autoFocus
                        type="text"
                        onChange={(e) => {
                            setPostName(e.target.value);
                        }}
                    />
                    {postNameError && <Typography color="warning">{postNameError}</Typography>}
                    <TextField
                        margin="normal"
                        fullWidth
                        name="description"
                        label="Description"
                        type="text"
                        id="description"
                        onChange={(e) => {
                            setPostDescription(e.target.value);
                        }}
                    />

                    {activity && (
                        <Box padding={2}>
                            <DisplayActivity activity={activity} displayIcons={false} />
                        </Box>
                    )}

                    {!activity && (
                        <>
                            <Paper sx={{ m: 2, p: 2 }}>
                                <Typography>Activity</Typography>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    autoFocus
                                    type="text"
                                    onChange={(e) => {
                                        console.log('===');
                                        setActivityName(e.target.value);
                                    }}
                                />
                                {activityNameError && (
                                    <Typography color="warning">{activityNameError}</Typography>
                                )}
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="location"
                                    label="Location"
                                    autoFocus
                                    type="text"
                                    onChange={(e) => {
                                        setLocationName(e.target.value);
                                    }}
                                />
                                {locationError && (
                                    <Typography color="warning">{locationError}</Typography>
                                )}
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    name="description"
                                    label="Description"
                                    type="text"
                                    id="description"
                                    onChange={(e) => {
                                        setActivityDescription(e.target.value);
                                    }}
                                />
                            </Paper>
                        </>
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Create!
                    </Button>
                </Box>
            </Paper>
        </>
    );
};

export default CreatePostForm;
