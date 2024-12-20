import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Stack } from '@mui/material';
import Link from 'next/link';
import { jwtDecode } from 'jwt-decode';
import Language from './language/Language';

type DecodedToken = {
    role: string;
};

const Header: React.FC = () => {
    const [userName, setUsername] = useState('');
    const [role, setRole] = useState('guest');

    useEffect(() => {
        const username = localStorage.getItem('loggedInUser');
        setUsername(username ? username : '');
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode<DecodedToken>(token);
        setRole(decodedToken.role);
    }, []);

    const handleLogout = () => {
        localStorage.setItem('loggedInUser', '');
        localStorage.removeItem('token');
    };

    return (
        <AppBar position="static">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Stack direction={'row'}>
                    <Link href="/" passHref>
                        <Button sx={{ color: 'white' }}>Home</Button>
                    </Link>

                    <Link href="/feed" passHref>
                        <Button sx={{ color: 'white' }}>Feed</Button>
                    </Link>

                    {(role === 'admin' || role === 'user') && (
                        <Link href={`/user/${userName}`} passHref>
                            <Button sx={{ color: 'white' }}>My profile</Button>
                        </Link>
                    )}

                    {(role == 'admin' || role == 'user') && (
                        <Link href={`/user/planners/createPlanner`} passHref>
                            <Button sx={{ color: 'white' }}>Add planner</Button>
                        </Link>
                    )}
                    {(role == 'admin' || role == 'user') && (
                        <Link href={`/user/posts/createPost`} passHref>
                            <Button sx={{ color: 'white' }}>Add post</Button>
                        </Link>
                    )}
                    {role === 'admin' && (
                        <Link href="/admin" passHref>
                            <Button sx={{ color: 'white', backgroundColor: 'red' }}>ADMIN</Button>
                        </Link>
                    )}
                </Stack>
                <Box>
                    <Stack direction={'row'}>
                        {userName && !(role === 'guest') && (
                            <Stack justifyContent={'center'}>
                                <Typography sx={{ color: 'white', marginRight: 2 }}>
                                    Welcome, {userName}
                                </Typography>
                            </Stack>
                        )}
                        {/* {' '} */}
                        {(!userName || role === 'guest') && (
                            <Box justifyContent={'center'} alignContent={'center'} padding={1}>
                                <Link href="/user/login">
                                    <Button 
                                        sx={{ color: 'white', backgroundColor: 'red' }}
                                        onClick={handleLogout}
                                    >
                                        Login
                                    </Button>
                                </Link>
                            </Box>
                        )}
                        {userName && !(role === 'guest') && (
                            <Box justifyContent={'center'} alignContent={'center'} padding={1}>
                                <Link href="/user/login" passHref>
                                    <Button
                                        sx={{ color: 'white', backgroundColor: 'red' }}
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </Button>
                                </Link>
                            </Box>
                        )}
                        <Language/>
                    </Stack>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
