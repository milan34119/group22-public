import Head from 'next/head';
import { useRouter } from 'next/router';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Link,
    FormControl,
    Select,
    MenuItem,
} from '@mui/material';
import UserService from 'service/UserService';
import styles from '@styles/home.module.css';
import { SetStateAction, useState } from 'react';
import { useTranslation } from 'next-i18next';
import Language from '@components/language/Language';

const Home: React.FC = () => {
<<<<<<< HEAD
    const { t, i18n } = useTranslation("en");
=======
    const { t } = useTranslation('common');
>>>>>>> 7f97b67edad5efc61efc8b681ec90d98e231e0f2
    const router = useRouter();
    const { locale, pathname, asPath, query } = router;
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

        i18n.changeLanguage('en')
        console.log(i18n.language)
        console.log(t("title"))
        console.log(t('test'))

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

    const handleLanguageChange = (event: { target: { value: string } }) => {
        const newLocale = event.target.value;
        router.push({ pathname, query }, asPath, { locale: newLocale });
    };

    return (
        <>
            <Head>
                <title>{t('page_title')}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>

            <Language></Language>

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

                    {/* <Box>
                    <Language/>
                    </Box> */}

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
                            onChange={(e: { target: { value: SetStateAction<string>; }; }) => {
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
                            onChange={(e: { target: { value: SetStateAction<string>; }; }) => {
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
                            <Button onClick={() => (handleGuest())}>
                                    {t('continue_guest')}
                            </Button>
                      </Typography>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default Home;
