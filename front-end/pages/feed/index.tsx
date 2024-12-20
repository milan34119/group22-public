import withAuth from '@/util/withAuth';
import ListFeed from '@/components/feed/listFeed';
import Header from '@/components/Header';
import noToken from '@/util/noToken';

const Feed: React.FC = () => {
    return (
        <>
            <Header />
            <ListFeed />
        </>
    );
};

export default noToken(Feed);
