import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { jwtDecode } from 'jwt-decode';

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

const withAdminAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const AdminAuthenticatedComponent = (props: P) => {
        const [isLoading, setIsLoading] = useState(true);
        const router = useRouter();

        useEffect(() => {
            const token = localStorage.getItem('token');

            if (!token) {
                router.push('/user/login');
            } else {
                try {
                    const decodedToken = jwtDecode<DecodedToken>(token);
                    if (decodedToken.role !== 'admin') {
                        router.push('/user/login');
                    } else {
                        if(!tokenIsStillValid(token)){
                            localStorage.removeItem('loggedInUser');
                            localStorage.removeItem('token');
                            router.push('/user/login')
                        }
                        else setIsLoading(false);
                    }
                } catch (error) {
                    console.error('Failed to decode token:', error);
                    router.push('/user/login');
                }
            }
        }, [router]);

        if (isLoading) {
            return;
        }

        return <WrappedComponent {...props} />;
    };

    return AdminAuthenticatedComponent;
};

export default withAdminAuth;
