// import Head from 'next/head';
// import { useRouter } from 'next/router';
// import { Container, Box, Typography, TextField, Button, Link, Alert } from '@mui/material';
// import UserService from 'service/UserService';
// import styles from '@styles/home.module.css';
// import { useState } from 'react';
// import { StatusMessage } from '@types';
// import { t } from 'i18next';
// import { setEngine } from 'crypto';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// import { GetServerSideProps } from 'next';

// const Home: React.FC = () => {
//     const { t } = useTranslation();
//     const router = useRouter();
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');

//     const [usernameError, setUsernameError] = useState('');
//     const [passwordError, setPasswordError] = useState('');

//     const clearErrors = () => {
//         setUsernameError('');
//         setPasswordError('');
//     };

//     const validate = (): boolean => {
//         let result = true;

//         if (!username || username.trim() === '') {
//             setUsernameError('Name cannot be empty.');
//             result = false;
//         }

//         if (!password || password.trim() === '') {
//             setPasswordError('Password cannot be empty.');
//             result = false;
//         }

//         return result;
//     };

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         clearErrors();

//         if (!validate()) {
//             return;
//         }

//         const user = { username, password };
//         const response = await UserService.loginUser(user);

//         if (response.status === 200) {
//             const user = await response.json();

//             console.log(user);

//             localStorage.setItem('token', user.token);
//             localStorage.setItem('loggedInUser', user.username);

//             router.push('/');
//         } else {
//             setPasswordError('Password or username incorrect');
//         }
//     };

//     return (
//         <>
//             <Head>
//                 <title>Login - TravelBlog</title>
//                 <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//             </Head>

//             <Container component="main" maxWidth="xs">
//                 <Box
//                     className={styles.form_container}
//                     sx={{
//                         marginTop: 8,
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                         padding: 4,
//                         boxShadow: 3,
//                         borderRadius: 2,
//                     }}
//                 >
//                     <Typography component="h1" variant="h5">
//                         Login to TravelBlog
//                     </Typography>

//                     <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
//                         <TextField
//                             margin="normal"
//                             required
//                             fullWidth
//                             id="username"
//                             label="Username"
//                             name="username"
//                             autoComplete="username"
//                             autoFocus
//                             type="text"
//                             onChange={(e) => {
//                                 setUsername(e.target.value);
//                             }}
//                         />
//                         {usernameError && <Typography color="warning">{usernameError}</Typography>}
//                         <TextField
//                             margin="normal"
//                             required
//                             fullWidth
//                             name="password"
//                             label="Password"
//                             type="password"
//                             id="password"
//                             autoComplete="current-password"
//                             onChange={(e) => {
//                                 setPassword(e.target.value);
//                             }}
//                         />
//                         {passwordError && <Typography color="warning">{passwordError}</Typography>}
//                         <Button
//                             type="submit"
//                             fullWidth
//                             variant="contained"
//                             color="primary"
//                             sx={{ mt: 3, mb: 2 }}
//                         >
//                             Log in
//                         </Button>
//                         <Typography variant="body2" align="center">
//                             Don’t have an account?
//                             <Link href="/user/registration" variant="body2">
//                                 Sign up
//                             </Link>
//                         </Typography>
//                         <Typography variant="body2" align="center">
//                             <Link href="/" variant="body2">
//                                 continue as Guest
//                             </Link>
//                         </Typography>
//                     </Box>
//                 </Box>
//             </Container>
//         </>
//     );
// };

// export const getServerSideProps: GetServerSideProps = async (context) => {
//     const { locale } = context;

//     return {
//         props: {
//             ...(await serverSideTranslations(locale ?? 'en', ['common'])),
//         },
//     };
// };

// export default Home;

import Head from 'next/head';
import { useRouter } from 'next/router';
import { Container, Box, Typography, TextField, Button, Link } from '@mui/material';
import UserService from 'service/UserService';
import styles from '@styles/home.module.css';
import { useState } from 'react';
import { StatusMessage } from '@types';
import { useTranslation } from 'next-i18next';

const Home: React.FC = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const clearErrors = () => {
        setUsernameError('');
        setPasswordError('');
    };

    const validate = (): boolean => {
        let result = true;

        if (!username || username.trim() === '') {
            setUsernameError(t('username_empty'));
            result = false;
        }

        if (!password || password.trim() === '') {
            setPasswordError(t('password_empty'));
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
            const user = await response.json();

            console.log(user);

            localStorage.setItem('token', user.token);
            localStorage.setItem('loggedInUser', user.username);

            router.push('/');
        } else {
            setPasswordError(t('login_error'));
        }
    };

    return (
        <>
            <Head>
                <title>{t('page_title')}</title>
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
                        {t('login_header')}
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
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                        />
                        {usernameError && <Typography color="warning">{usernameError}</Typography>}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label={t('password_label')}
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => {
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
                            {t('login_button')}
                        </Button>
                        <Typography variant="body2" align="center">
                            {t('no_account')}{' '}
                            <Link href="/user/registration" variant="body2">
                                {t('signup')}
                            </Link>
                        </Typography>
                        <Typography variant="body2" align="center">
                            <Link href="/" variant="body2">
                                {t('continue_guest')}
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default Home;
