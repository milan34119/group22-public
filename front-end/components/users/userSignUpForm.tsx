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

    const [nameError, setNameError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const clearErrors = () => {
        setNameError("");
        setUsernameError("");
        setEmailError("");
        setPasswordError("");
    }

    const addError = (messages: StatusMessage[], error:string) => {
        return [
            ...messages,
            {
                type: 'error',
                message: error,
            },
        ]
    }

    const validate = ({name, username, email, password}: {name:string, username: string, email:string, password:string}) => {
        let isValid = true
        if (!name || name.trim() == "") {
            setNameError("Name is required");
            isValid = false
        }

        if (!username || username.trim() == "") {
            setUsernameError("Username is required");
            isValid = false
        }

        if (!email || email.trim() == "") {
            setEmailError('Email is required');
            isValid = false
        }

        else if (!password || password.trim() == "") {
            setPasswordError('Password is required');
            isValid = false
        }

        return isValid;        
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        clearErrors()

        if(!validate({name, username, email, password})) return;


        const user = { name, email, username, password };
        const response = await UserService.addUser(user);
        
        if (response.status === 200) {
            const user = await response.json();

            localStorage.setItem('token', user.token);
            localStorage.setItem('loggedInUser', user.username);

            router.push('/')
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
                        {usernameError && <Typography color='warning'>{usernameError}</Typography>}
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
                        {nameError && <Typography color='warning'>{nameError}</Typography>}
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
                        {emailError && <Typography color='warning'>{emailError}</Typography>}
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
                        {passwordError && <Typography color='warning'>{passwordError}</Typography>}
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

export default UserSignupForm;