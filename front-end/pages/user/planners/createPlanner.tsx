import Header from '@/components/Header';
import CreatePlannerForm from '@/components/planners/CreatePlannerForm';
import withAuth from '@/util/withAuth';

const createPlanner = () => {
    return (
        <>
            <Header />
            <CreatePlannerForm />
        </>
    );
};

export default withAuth(createPlanner);
