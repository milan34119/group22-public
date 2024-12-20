import { jwtDecode } from 'jwt-decode';
import router from 'next/router';
import { useEffect, useState } from 'react';
import type { ComponentType } from 'react';

type DecodedToken = {
    role: string;
    exp: number;
};

const tokenIsStillValid = (token: string):Boolean => {
    try {
        const decodedToken = jwtDecode<DecodedToken>(token)
        if (decodedToken.exp < (new Date().getTime() + 1) / 1000) {
            return false;
        }
    } catch (err) {
      return false;
    }
    return true;
}


const noToken = <P extends object>(WrappedComponent: ComponentType<P>) => {
    const AuthenticatedComponent = (props: P) => {
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            const token = localStorage.getItem('token');

            if (!token) {
                router.push('/user/login');
            }else {
                setIsLoading(false);
            }

        }, [router]);

        if (isLoading) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };
    return AuthenticatedComponent;
};

export default noToken;
