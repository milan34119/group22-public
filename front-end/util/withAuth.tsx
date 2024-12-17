import { jwtDecode } from 'jwt-decode';
import router from 'next/router';
import { useEffect, useState } from 'react';
import type { ComponentType } from 'react';

type DecodedToken = {
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


const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
    const AuthenticatedComponent = (props: P) => {
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/');
            } else {
                if(!tokenIsStillValid(token)){
                    localStorage.setItem('loggedInUser', '');
                    localStorage.removeItem('token');
                    router.push('/')
                }
                else setIsLoading(false);
            }
        }, [router]);

        if (isLoading) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };
    return AuthenticatedComponent;
};

export default withAuth;
