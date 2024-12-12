import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Post } from "@types";

type Props = {
    post: Post
}

const FeedItem: React.FC<Props> = ({post}:Props) => {
    return (
        <>
        <Container component="main" maxWidth="xs">
            <Typography>
                {post.name}
            </Typography>
            <Typography>
                {post.description}
            </Typography>
        </Container>
        
        
        </>
    );
};

export default FeedItem;