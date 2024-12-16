import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

type DecodedToken = {
    role?: string;
};

const Header: React.FC = () => {
    const router = useRouter();
    const [userName, setUsername] = useState('')
    const [role, setRole] = useState("guest")

    useEffect(() => {
        const username = localStorage.getItem("loggedInUser");
        setUsername(username?username:"")
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) setRole("guest");
        else {
            const decodedToken = jwtDecode<DecodedToken>(token);
            setRole(decodedToken.role?decodedToken.role:"guest")
        }
        
    }, []);


    const handleLogout = () => {
        localStorage.setItem('loggedInUser', "");
        localStorage.removeItem('token');
        router.refresh()
    };

    return (
        <AppBar position="static">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex' }}>
                    <Link href="/" passHref>
                        <Button color="inherit">Home</Button>
                    </Link>
                    <Link href="/feed" passHref>
                        <Button color="inherit">Feed</Button>
                    </Link>
                    {!userName && (
                        <Link href="/user/login" passHref>
                            <Button color="inherit">Login</Button>
                        </Link>
                    )}
                    {userName && (
                        <Link href="/" passHref>
                            <Button color="inherit" onClick={handleLogout}>
                                Logout
                            </Button>
                        </Link>
                    )}
                    {(role == "admin" || role == "user") && (
                        <Link href="/" passHref>
                            <Button color="inherit">My posts</Button>
                        </Link>
                    )}
                    {role == "admin" && (
                        <Link href="/admin" passHref>
                            <Button color="inherit">ADMIN</Button>
                        </Link>
                    )}
                    
                    
                </Box>
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
