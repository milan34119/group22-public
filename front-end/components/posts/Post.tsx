import DisplayActivity from '@components/Activity/Activity';
import { Card, CardContent, Typography, IconButton, Container, Stack } from '@mui/material';
import { Activity, Post } from '@types';
import { FaCircleXmark } from 'react-icons/fa6';

type Props = {
    post: Post
    displayIcons?:boolean
};

const DisplayPost: React.FC<Props> = ({ post, displayIcons=true}: Props) => {
    return (
        <Container>
            <Stack>
                <Typography variant='h5'>{post.name}</Typography>
                {post.description && <Typography variant='body1'>{post.description}</Typography>}
                <DisplayActivity activity={post.activity} displayIcons={displayIcons}/>
                <Stack>
                    {post.comments && post.comments.map(comment => (
                        <Typography>{comment}</Typography>
                    ))}
                </Stack>
            </Stack>
        </Container>
    );
};

export default DisplayPost;