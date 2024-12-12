// import Head from "next/head";
// import styles from '@styles/home.module.css';
// import UserService from "service/UserService";
// import { redirect } from "next/dist/server/api-utils";
// import { json } from "stream/consumers";

// const Home: React.FC = () => {
//     return (
//       <>
//         <div className={styles.form_container}>
//             <h2>sign up to TravelBlog</h2>
//             <form
//                 onSubmit={async (e: React.SyntheticEvent) => {
//                     e.preventDefault();
//                     const target = e.target as typeof e.target & {
//                     name: {value: string};
//                     email: { value: string };
//                     password: { value: string };
//                     };
//                     const email = target.email.value; // typechecks!
//                     const password = target.password.value; // typechecks!
//                     const name = target.name.value; // typechecks!

//                     const response = await UserService.getAllUsers();
//                     const json = await response.json();
//                     const id = json.length
//                     await UserService.addUser({id, name, email, password})
//                     window.location.replace(`/`);

//                 }}
//             >
//                 <div>
//                     <label>
//                     Name:
//                     <input type="name" name="name" required />
//                     </label>
//                 </div>
//                 <div>
//                     <label>
//                     Email:
//                     <input type="email" name="email" required />
//                     </label>
//                 </div>
//                 <div>
//                     <label>
//                     Password:
//                     <input type="password" name="password" required />
//                     </label>
//                 </div>
//                 <div>
//                     <input type="submit" value="sign up" />
//                 </div>
//                 </form>
//             <p>already have an account? <a href="../">log in</a></p>
//         </div>
//       </>
//     );
//   };

//   export default Home;

import Head from 'next/head';
import UserService from 'service/UserService';
import React, { ReactComponentElement } from 'react';
import router, { useRouter } from 'next/router';
import { Box, Button, Container, Link, TextField, Typography } from '@mui/material';

const UserSignupPage: React.FC = () => {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const response = await UserService.addUser({ name, email, password });
            const data = await response.json();
            const id = data.id;

            if (id) {
                router.replace('/');
                // router.replace(`/user/${id}`);
            }
        } catch (error) {
            console.error('Login failed', error);
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
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
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

export default UserSignupPage;
