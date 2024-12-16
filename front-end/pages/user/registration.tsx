import Head from 'next/head';
import UserService from 'service/UserService';
import React, { ReactComponentElement } from 'react';
import router, { useRouter } from 'next/router';
import { Box, Button, Container, Link, TextField, Typography } from '@mui/material';
import UserSignupForm from '@components/users/userSignUpForm';

const UserSignupPage: React.FC = () => {
    return (
        <>
            <UserSignupForm/>
        </>
    );
};

export default UserSignupPage;
