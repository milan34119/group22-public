import React from 'react';
import UserLoginForm from '../../components/users/userLoginForm';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const UserLoginPage: React.FC = () => {
    const { t } = useTranslation('common');

    return <UserLoginForm />;
};

export const getServerSideProps = async (context: { locale: any; }) => {
    const { locale } = context;
    console.log(locale);

    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'en', ['common'])),
        },
    };
};

export default UserLoginPage;