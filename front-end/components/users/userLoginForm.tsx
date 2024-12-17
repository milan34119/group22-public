import Head from 'next/head';
import { useRouter } from 'next/router';
import { Container, Box, Typography, TextField, Button, Link, Alert } from '@mui/material';
import UserService from 'service/UserService';
import styles from '@styles/home.module.css';
import { useState } from 'react';
import { StatusMessage } from '@types';
import { t } from 'i18next';

const Home: React.FC = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [usernameError, setUsernameError] = useState<String | null>(null);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    const clearErrors = () => {
        setUsernameError(null);
        setStatusMessages([]);
    };

    const validate = (): boolean => {
        let result = true;

        if (!username || username.trim() === '') {
            setUsernameError('Name cannot be empty.');
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

        const user = { username, password };
        const response = await UserService.loginUser(user);

        if (response.status === 200) {
            setStatusMessages([{ message: t('login success'), type: 'success' }]);

            const user = await response.json();

            console.log(user);

            localStorage.setItem('token', user.token);
            localStorage.setItem('loggedInUser', user.username);

            setStatusMessages([
                ...statusMessages,
                {
                    type: 'success',
                    message: 'Login successful. Redirecting to homepage...',
                },
            ]);

            setTimeout(() => router.push('/'), 800);
        }
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
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            type="text"
                            onChange={(e) => {
                                setUsername(e.target.value);
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
                            Log in
                        </Button>
                        <Typography variant="body2" align="center">
                            Don’t have an account?
                            <Link href="/user/registration" variant="body2">
                                Sign up
                            </Link>
                        </Typography>
                        <Typography variant="body2" align="center">
                            <Link href="/" variant="body2">
                                continue as Guest
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default Home;
