import Head from 'next/head';
import { useRouter } from 'next/router';
import { Container, Box, Typography, TextField, Button, Link, Alert, Paper } from '@mui/material';
import PlannerService from '@/service/PlannerService';
import styles from '@/styles/home.module.css';
import { useEffect, useState } from 'react';
import { Planner, Post, User } from '@/types';
import { t } from 'i18next';
import { setEngine } from 'crypto';

const CreatePlannerForm: React.FC = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [userName, setUsername] = useState('');

    const [nameError, setNameError] = useState('');

    useEffect(() => {
        const username = localStorage.getItem('loggedInUser');
        setUsername(username ? username : '');
    }, []);

    const clearErrors = () => {
        setNameError('');
    };

    const validate = (): boolean => {
        let result = true;

        if (!name || name.trim() === '') {
            setNameError('Name cannot be empty.');
            result = false;
        }

        return result;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        clearErrors();

        if (!validate()) {
            return;
        }

        const planner = { name, description };
        const response = await PlannerService.createPlannerForUser(planner, userName);

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
                    Create a new planner
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
                            setName(e.target.value);
                        }}
                    />
                    {nameError && <Typography color="warning">{nameError}</Typography>}
                    <TextField
                        margin="normal"
                        fullWidth
                        name="description"
                        label="Description"
                        type="text"
                        id="description"
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                    />
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

export default CreatePlannerForm;
