import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import Link from 'next/link';

const Header: React.FC = () => {
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        const loggedInUser = sessionStorage.getItem('loggedInUser');
        setEmail(loggedInUser);
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('loggedInUser');
        setEmail(null);
    };

    return (
        <AppBar position="static">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex' }}>
                    <Link href="/" passHref>
                        <Button color="inherit">Home</Button>
                    </Link>
                    <Link href="/about" passHref>
                        <Button color="inherit">About</Button>
                    </Link>
                    {!email && (
                        <Link href="/user/login" passHref>
                            <Button color="inherit">Login</Button>
                        </Link>
                    )}
                    {!email && (
                        <Link href="/user/registration">
                            <Button color="inherit">Register</Button>
                        </Link>
                    )}
                    {email && (
                        <Link href="/" passHref>
                            <Button color="inherit" onClick={handleLogout}>
                                Logout
                            </Button>
                        </Link>
                    )}
                </Box>
                {email && (
                    <Typography variant="body1" sx={{ marginRight: 2 }}>
                        Welcome, {email}!
                    </Typography>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
