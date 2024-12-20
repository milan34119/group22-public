import React from 'react';
import UserLoginForm from '../../components/users/userLoginForm';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { Typography } from '@mui/material';

const UserLoginPage: React.FC = () => {
    const { t } = useTranslation();
    return (
    <>
        <Typography>{t('login.title')}</Typography>
        <UserLoginForm />;
    </>)
};

export const getServerSideProps = async (context: { locale: any; }) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'en', ['common'])),
        },
    };
};

export default UserLoginPage;