// // import Head from 'next/head';
// // import styles from '@styles/home.module.css';
// // import UserService from "service/UserService";

// // const Home: React.FC = () => {
// //     return (
// //       <>
// //         <div className={styles.form_container}>
// //             <h2>Login to TravelBlog</h2>
// //             <form
// //                 onSubmit={async (e: React.SyntheticEvent) => {
// //                     e.preventDefault();
// //                     const target = e.target as typeof e.target & {
// //                     email: { value: string };
// //                     password: { value: string };
// //                     };
// //                     const email = target.email.value; // typechecks!
// //                     const password = target.password.value; // typechecks!

// //                     const id = (await (await UserService.login({email, password})).json()).id
// //                     window.location.replace(`/user/${id}`);

// //                 }}
// //             >
// //                 <div>
// //                     <label>
// //                     Email:
// //                     <input type="email" name="email" required />
// //                     </label>
// //                 </div>
// //                 <div>
// //                     <label>
// //                     Password:
// //                     <input type="password" name="password" required />
// //                     </label>
// //                 </div>
// //                 <div>
// //                     <input type="submit" value="Log in" />
// //                 </div>
// //                 </form>
// //             <p>Don't have an account? <a href="/registration">Sign up</a></p>
// //         </div>
// //       </>

// //     );
// // };

// // export default Home;

// import Head from 'next/head';
// import { useRouter } from 'next/router';
// import { Container, Box, Typography, TextField, Button, Link } from '@mui/material';
// import UserService from 'service/UserService';
// import styles from '@styles/home.module.css';

// const Home: React.FC = () => {
//     const router = useRouter();

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         const formData = new FormData(e.currentTarget);
//         const email = formData.get('email') as string;
//         const password = formData.get('password') as string;

//         try {
//             const response = await UserService.login({ email, password });
//             const data = await response.json();
//             const id = data.id;

//             if (id) {
//                 router.replace(`/user/${id}`);
//             }
//         } catch (error) {
//             console.error('Login failed', error);
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
//                             id="email"
//                             label="Email Address"
//                             name="email"
//                             autoComplete="email"
//                             autoFocus
//                             type="email"
//                         />
//                         <TextField
//                             margin="normal"
//                             required
//                             fullWidth
//                             name="password"
//                             label="Password"
//                             type="password"
//                             id="password"
//                             autoComplete="current-password"
//                         />
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
//                             <Link href="/registration" variant="body2">
//                                 Sign up
//                             </Link>
//                         </Typography>
//                     </Box>
//                 </Box>
//             </Container>
//         </>
//     );
// };

// export default Home;

import Head from 'next/head';
import { Container, Typography, Box, AppBar, Toolbar, Card, CardContent } from '@mui/material';
import Header from 'components/Header';

const Home: React.FC = () => {
    return (
        <>
            <Head>
                <title>Travelblog Platform</title>
                <meta name="description" content="A platform to track and share travel memories" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header></Header>

            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Typography variant="h3" align="center" gutterBottom>
                    Welcome to Travelblog!
                </Typography>
                <Typography variant="body1" align="center" color="textSecondary" paragraph>
                    Travelblog is a community platform where travelers can record memories, share
                    experiences, and get inspiration for future trips. Connect with others based on
                    location or activities and keep your travel ideas organized.
                </Typography>

                <Box display="flex" flexDirection="column" gap={3} mt={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5">
                                1. Register and Create Your Profile
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Sign up to join the community. Create a personal profile to track
                                your journeys and share with others. Customize your profile with a
                                photo and bio to make it uniquely yours.
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <Typography variant="h5">2. Post Your Travel Experiences</Typography>
                            <Typography variant="body2" color="textSecondary">
                                Record your travel memories with detailed posts. Add a title,
                                description, geolocation, photos, and tags to each post to capture
                                the essence of your journey and inspire others.
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <Typography variant="h5">3. Plan Your Future Adventures</Typography>
                            <Typography variant="body2" color="textSecondary">
                                Organize upcoming trips with a personalized travel planner. Add
                                destinations, set itineraries, and manage travel details in one
                                place.
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <Typography variant="h5">
                                4. Discover & Connect Through Geolocation
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Find travel posts by location or activity, like city tours or hiking
                                spots. Comment on posts and save ideas for your future trips.
                                Explore an interactive map of user posts to see where others have
                                been and connect with fellow travelers.
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            </Container>
        </>
    );
};

export default Home;
