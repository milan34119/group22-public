import Head from 'next/head';
import { useRouter } from 'next/router';
import { Container, Box, Typography, TextField, Button, Link, Alert } from '@mui/material';
import UserService from 'service/UserService';
import styles from '@styles/home.module.css';
import { useState } from 'react';
import { StatusMessage } from '@types';

const Home: React.FC = () => {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState<String | null>(null);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    const clearErrors = () => {
        setEmailError(null);
        setStatusMessages([]);
    };

    const validate = (): boolean => {
        let result = true;

        if (!email || email.trim() === '') {
            setEmailError('Name cannot be empty.');
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

        sessionStorage.setItem('loggedInUser', email);

        setStatusMessages([
            ...statusMessages,
            {
                type: 'success',
                message: 'Login successful. Redirecting to homepage...',
            },
        ]);

        setTimeout(() => router.push('/'), 2000);

        // const formData = new FormData(e.currentTarget);
        // const email = formData.get('email') as string;
        // const password = formData.get('password') as string;

        // try {
        //     const response = await UserService.login({ email, password });
        //     const data = await response.json();
        //     const id = data.id;

        //     if (id) {
        //         router.replace(`/user/${id}`);
        //     }
        // } catch (error) {
        //     console.error('Login failed', error);
        // }
    };

    return (
        <>
            <Head>
                <title>Login - TravelBlog</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>

            <Container component="main" maxWidth="xs">
                <Box
                    className={styles.form_container}
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
                        Login to TravelBlog
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
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            type="email"
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
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Log in
                        </Button>
                        <Typography variant="body2" align="center">
                            Don’t have an account?
                            <Link href="/registration/signup" variant="body2">
                                Sign up
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default Home;
