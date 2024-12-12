import withAuth from "util/withAuth";
import ListFeed from "@components/feed/listFeed";


const Feed: React.FC = () => {
    return (
        <>
            <ListFeed/>
        </>
    );
};

export default withAuth(Feed);