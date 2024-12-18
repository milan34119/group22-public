import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, Toolbar, Typography, Box, Button, IconButton } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

type DecodedToken = {
    role?: string;
};

const Header: React.FC = () => {
    const router = useRouter();
    const [userName, setUsername] = useState('');
    const [role, setRole] = useState('guest');

    useEffect(() => {
        const username = localStorage.getItem('loggedInUser');
        setUsername(username ? username : '');
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) setRole('guest');
        else {
            const decodedToken = jwtDecode<DecodedToken>(token);
            setRole(decodedToken.role ? decodedToken.role : 'guest');
        }
    }, []);

    const handleLogout = () => {
        localStorage.setItem('loggedInUser', '');
        localStorage.removeItem('token');
        router.refresh();
    };

    const handleMyPostsClick = () => {
        if (userName) {
            router.push(`/user/posts/${userName}`);
        }
    };

    return (
        <AppBar position="static">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex' }}>
                    <Link href="/" passHref>
                        <Button sx={{ color: 'white' }}>Home</Button>
                    </Link>
                    <Link href="/feed" passHref>
                        <Button sx={{ color: 'white' }}>Feed</Button>
                    </Link>
                    {!userName && (
                        <Link href="/user/login" passHref>
                            <Button sx={{ color: 'white' }}>Login</Button>
                        </Link>
                    )}
                    {userName && (
                        <Link href="/" passHref>
                            <Button sx={{ color: 'white' }} onClick={handleLogout}>
                                Logout
                            </Button>
                        </Link>
                    )}
                    {(role == 'admin' || role == 'user') && (
                        <Link href={`/user/${userName}`} passHref>
                            <Button sx={{ color: 'white' }}>
                                My profile
                            </Button>
                        </Link>
                    )}
                    {role == 'admin' && (
                        <Link href="/admin" passHref>
                            <Button sx={{ color: 'red' }}>ADMIN</Button>
                        </Link>
                    )}
                    {(role == 'admin' || role == 'user') && (
                        <Link href={`/user/planners/createPlanner`} passHref>
                            <Button sx={{ color: 'white' }}>
                                Add planner 
                            </Button>
                        </Link>
                    )}
                </Box>
                {/* {(role == 'admin' || role == 'user') && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
                        <Link href="/create-post" passHref>
                            <IconButton color="inherit" component="a">
                                <AddIcon />
                            </IconButton>
                        </Link>
                    </Box>
                )} */}

                {userName && (
                    <Typography variant="body1" sx={{ marginRight: 2 }}>
                        Welcome, {userName}!
                    </Typography>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
