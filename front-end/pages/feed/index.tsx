import withAuth from "util/withAuth";
import ListFeed from "@components/feed/listFeed";
import Header from "@components/Header";


const Feed: React.FC = () => {
    return (
        <>
            <Header/>
            <ListFeed/>
        </>
    );
};

export default Feed;