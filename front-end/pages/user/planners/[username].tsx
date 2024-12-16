import Header from '@components/Header';
import PlannerOverviewTable from '@components/planners/PlannerOverviewTable';
import PostOverviewTable from '@components/posts/PostOverviewTable';
import { Planner, User } from '@types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import UserService from 'service/UserService';
import withAuth from 'util/withAuth';

const ReadUserByUsername = () => {
    const [user, setUser] = useState<User | null>(null);
    const [planners, setPlanners] = useState<Array<Planner>>([]);
    const router = useRouter();
    const { username } = router.query;

    const getUserByUsername = async () => {
        const userResponse = await UserService.getUserByUsername(username as string);
        if (userResponse.status === 400) return;
        setUser(await userResponse.json());
    };

    useEffect(() => {
        if (username) {
            getUserByUsername()
        };
    }, [username]);

    useEffect(() => {
        if (user) {
            const userPlanners = user.planners
            setPlanners(userPlanners)
        }
    }, [user])

    return (
        <>
            <Header/>
            <main className="d-flex flex-column justify-content-center align-items-center">
                <section>
                    <h1>Your Planners</h1>
                </section>

                {planners && <PlannerOverviewTable planners={planners} />}
            </main>
        </>
    );
};

export default withAuth(ReadUserByUsername);
