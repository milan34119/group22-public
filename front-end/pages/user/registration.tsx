import Head from 'next/head';
import UserService from '@/service/UserService';
import React, { ReactComponentElement } from 'react';
import router, { useRouter } from 'next/router';
import { Box, Button, Container, Link, TextField, Typography } from '@mui/material';
import UserSignupForm from '@/components/users/userSignUpForm';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const UserSignupPage: React.FC = () => {
    return (
        <>
            <UserSignupForm />
        </>
    );
};

export const getServerSideProps = async (context: { locale: any }) => {
    const { locale } = context;
    console.log(locale);

    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'en', ['common'])),
        },
    };
};

export default UserSignupPage;
