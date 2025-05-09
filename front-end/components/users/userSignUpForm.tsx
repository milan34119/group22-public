import Head from 'next/head';
import UserService from '@/service/UserService';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Container, Link, TextField, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Language from '@/components/language/Language';

const UserSignupForm: React.FC = () => {
    const { t } = useTranslation('common');
    const router = useRouter();
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [nameError, setNameError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const clearErrors = () => {
        setNameError('');
        setUsernameError('');
        setEmailError('');
        setPasswordError('');
    };

    const validate = ({
        name,
        username,
        email,
        password,
    }: {
        name: string;
        username: string;
        email: string;
        password: string;
    }) => {
        let isValid = true;
        if (!name || name.trim() === '') {
            setNameError(t('name_error'));
            isValid = false;
        }

        if (!username || username.trim() === '') {
            setUsernameError(t('username_error'));
            isValid = false;
        }

        if (!email || email.trim() === '') {
            setEmailError(t('email_error'));
            isValid = false;
        } else if (!password || password.trim() === '') {
            setPasswordError(t('password_error'));
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        clearErrors();

        if (!validate({ name, username, email, password })) return;

        const user = { name, email, username, password };
        const response = await UserService.addUser(user);

        if (response.status === 200) {
            const user = await response.json();

            localStorage.setItem('token', user.token);
            localStorage.setItem('loggedInUser', user.username);

            router.push('/');
        }
    };

    const handleGuest = async () => {
        clearErrors();

        const user = { username: 'GUEST', password: 'GUEST' };
        const response = await UserService.loginUser(user);

        if (response.status === 200) {
            const user = await response.json();

            localStorage.setItem('token', user.token);
            localStorage.setItem('loggedInUser', user.username);

            router.push('/');
        } else {
            setPasswordError(t('login_error'));
        }
    };

    return (
        <>
            <Head children={null as unknown as React.ReactNode}>
                <title>{t('signup_title')}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>

            <Box
                sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    backgroundColor: 'white',
                    borderRadius: 1,
                    boxShadow: 3,
                    padding: 1,
                }}
            >
            <Language/>
            </Box>

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
                        {t('signup_header')}
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label={t('username_label')}
                            name="username"
                            autoComplete="username"
                            autoFocus
                            type="text"
                            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => {
                                setUsername(e.target.value);
                            }}
                        />
                        {usernameError && <Typography color="warning">{usernameError}</Typography>}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label={t('name_label')}
                            name="name"
                            autoComplete="name"
                            type="text"
                            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => {
                                setName(e.target.value);
                            }}
                        />
                        {nameError && <Typography color="warning">{nameError}</Typography>}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label={t('email_label')}
                            name="email"
                            type="email"
                            autoComplete="email"
                            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => {
                                setEmail(e.target.value);
                            }}
                        />
                        {emailError && <Typography color="warning">{emailError}</Typography>}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label={t('password_label')}
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => {
                                setPassword(e.target.value);
                            }}
                        />
                        {passwordError && <Typography color="warning">{passwordError}</Typography>}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {t('signup_button')}
                        </Button>
                        <Typography variant="body2" align="center">
                            {t('signin_prompt')}{' '}
                            <Link href="/user/login" variant="body2">
                                {t('login_link')}
                            </Link>
                        </Typography>
                        <Typography variant="body2" align="center">
                            <Button onClick={() => handleGuest()}>{t('continue_guest')}</Button>
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default UserSignupForm;
