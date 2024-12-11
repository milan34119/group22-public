import Head from 'next/head';
import { useRouter } from 'next/router';
import { Container, Box, Typography, TextField, Button, Link, Alert } from '@mui/material';
import { useState } from 'react';
import styles from '@styles/home.module.css';
import { StatusMessage } from '@types';

const Registration: React.FC = () => {
    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    const clearErrors = () => {
        setErrors({});
        setStatusMessages([]);
    };

    const validate = (): boolean => {
        let valid = true;
        const newErrors: typeof errors = {};

        if (!name || name.trim() === '') {
            newErrors.name = 'Name cannot be empty.';
            valid = false;
        }
        if (!email || email.trim() === '') {
            newErrors.email = 'Email cannot be empty.';
            valid = false;
        }
        if (!password || password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long.';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        clearErrors();

        if (!validate()) {
            return;
        }

        try {
            // Simulate registration API call
            // Replace this with actual API interaction
            await new Promise((resolve) => setTimeout(resolve, 1000));

            setStatusMessages([
                {
                    type: 'success',
                    message: 'Registration successful! Redirecting to login page...',
                },
            ]);
            setTimeout(() => router.push('/login'), 2000);
        } catch (error) {
            setStatusMessages([
                {
                    type: 'error',
                    message: 'Registration failed. Please try again.',
                },
            ]);
        }
    };

    return (
        <>
            <Head>
                <title>Register - TravelBlog</title>
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
                        Create an Account
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
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            onChange={(e) => setName(e.target.value)}
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={(e) => setEmail(e.target.value)}
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            onChange={(e) => setPassword(e.target.value)}
                            error={!!errors.password}
                            helperText={errors.password}
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
                            Already have an account?{' '}
                            <Link href="/login" variant="body2">
                                Log in
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default Registration;
