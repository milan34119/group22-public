import Header from "@components/Header";
import UserList from "@components/admin/listUsers";
import withAuth from "util/withAuth";
import withAdminAuth from "util/withAuthAndAdmin";

const Page: React.FC = () => {
    return (
        <>
            <Header/>
            <UserList/>
        </>
    );
};

export default withAdminAuth(Page);