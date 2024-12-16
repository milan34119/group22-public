import Head from 'next/head';
import UserService from 'service/UserService';
import React, { ReactComponentElement, useState } from 'react';
import router, { useRouter } from 'next/router';
import { Alert, Box, Button, Container, Link, TextField, Typography } from '@mui/material';
import { StatusMessage } from '@types';
import { t } from 'i18next';

const UserSignupForm: React.FC = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [usernameError, setUsernameError] = useState<String | null>(null);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    const clearErrors = () => {
        setUsernameError(null);
        setStatusMessages([]);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        clearErrors();

        const user = { name, email, username, password };
        const response = await UserService.addUser(user);
        
        if (response.status === 200) {
            setStatusMessages([{ message: t('login success'), type: 'success' }]);

            const user = await response.json();

            localStorage.setItem('token', user.token);
            localStorage.setItem('loggedInUser', user.username);

            setStatusMessages([
                ...statusMessages,
                {
                    type: 'success',
                    message: 'Signup successful. Redirecting to homepage...',
                },
            ]);

            setTimeout(() => router.push('/'), 800);
        
        }
        else {
            setStatusMessages([
                ...statusMessages,
                {
                    type: 'error',
                    message: 'Oops, something went wrong.',
                },
            ]);
        }
    };

    return (
        <>
            <Head>
                <title>Register for TravelBlog</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>

            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: 4,
                        boxShadow: 3,
                        borderRadius: 2,
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign up to TravelBlog
                    </Typography>

                    <Box sx={{ width: '100%', mb: 2 }}>
                        {statusMessages.length > 0 &&
                            statusMessages.map((status, index) => (
                                <Alert key={index} severity={status.type} sx={{ mb: 1 }}>
                                    {status.message}
                                </Alert>
                            ))}
                    </Box>

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            type='text'
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            type='text'
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign up
                        </Button>
                        <Typography variant="body2" align="center">
                            Already have an account?
                            <Link href="/user/login" variant="body2">
                                Log in
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default UserSignupForm;