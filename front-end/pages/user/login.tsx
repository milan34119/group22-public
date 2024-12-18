import React from 'react';
import UserLoginForm from '../../components/users/userLoginForm';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Header from '@components/Header';

const UserLoginPage: React.FC = () => {
    return <UserLoginForm />;
};

export const getServerSideProps = async (context: { locale: any }) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'en', ['common'])),
        },
    };
};

export default UserLoginPage;
