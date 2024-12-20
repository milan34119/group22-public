import DisplayActivity from '@/components/Activity/Activity';
import {
    Card,
    CardContent,
    Typography,
    IconButton,
    Container,
    Stack,
    Link,
    Tooltip,
    Box,
    Button,
    TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Activity, Post } from '@/types';
import { ReactElement, useEffect, useState } from 'react';
import { FaCircleCheck, FaCirclePlus, FaCircleXmark, FaCommentDots } from 'react-icons/fa6';
import postService from '@/service/PostService';

type Props = {
    post: Post;
    displayIcons?: boolean;
};

const DisplayPost: React.FC<Props> = ({ post, displayIcons = true }: Props) => {
    const [showCommentField, setShowcommentField] = useState(false);
    const [comment, setComment] = useState('');
    const [allcomments, setAllcomments] = useState<string[]>(post.comments);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const username = localStorage.getItem('loggedInUser');
        setUsername(username ? username : '');
    }, []);

    const toggleShow = () => {
        setShowcommentField(!showCommentField);
        setComment('');
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!post.id || !comment || !username) return;

        const fullComment = `${username} - "${comment}"`;

        const response = await postService.addCommentToPost({ comment: fullComment }, post.id);

        if (response.status === 200) {
            if (allcomments.length < 3) {
                setAllcomments([fullComment, ...allcomments]);
            } else {
                setAllcomments([fullComment, allcomments[0], allcomments[1]]);
            }
            setComment('');
            setShowcommentField(false);
        }
    };

    return (
        <Container>
            <Stack>
                <Grid container>
                    <Grid size={11}>
                        <Typography variant="h5">{post.name}</Typography>
                    </Grid>
                    {displayIcons && (
                        <>
                            <Grid size={1}>
                                <Tooltip children={null as unknown as ReactElement} title="Leave a comment">
                                    <IconButton
                                        sx={{ alignSelf: 'right' }}
                                        color="primary"
                                        onClick={toggleShow}
                                    >
                                        <FaCommentDots />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </>
                    )}
                </Grid>
                {post.description && <Typography variant="body1">{post.description}</Typography>}
                {!post.description && (
                    <Typography variant="body1" color="white">
                        -
                    </Typography>
                )}
                {showCommentField && displayIcons && (
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            autoFocus
                            type="text"
                            onChange={(e) => {
                                setComment(e.target.value);
                            }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            comment
                        </Button>
                    </Box>
                )}
                <DisplayActivity activity={post.activity} displayIcons={displayIcons} />
                <Stack>
                    {allcomments && (
                        <>
                            <Typography variant="h5">comments:</Typography>
                            {allcomments.map((comment) => (
                                <Typography sx={{ ml: 1 }}>{comment}</Typography>
                            ))}
                        </>
                    )}
                    {allcomments.length < 3 && (
                        <Typography sx={{ ml: 1 }} color="white">
                            -
                        </Typography>
                    )}
                    {allcomments.length < 2 && (
                        <Typography sx={{ ml: 1 }} color="white">
                            -
                        </Typography>
                    )}
                    {allcomments.length < 1 && (
                        <Typography sx={{ ml: 1 }} color="white">
                            -
                        </Typography>
                    )}
                </Stack>
            </Stack>
        </Container>
    );
};

export default DisplayPost;
