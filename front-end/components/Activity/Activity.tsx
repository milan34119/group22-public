import { Card, CardContent, Typography, IconButton, Container, Stack, Paper, Box, Link, Tooltip } from '@mui/material';
import Grid from '@mui/material/Grid2'
import { Activity } from '@types';
import { useRouter } from 'next/router';
import { FaCircleCheck, FaCirclePlus, FaCircleXmark } from 'react-icons/fa6';

type Props = {
    activity: Activity
    displayPlus?: boolean
};

const DisplayActivity: React.FC<Props> = ({ activity, displayPlus=true }: Props) => {
    const router = useRouter();
    return (
        <Container>
        <Paper elevation={1} sx={{p: 2 }}>
            <Stack>
                <Grid container>
                    <Grid size={10}>
                        <Typography  variant='h5'>{activity.name}</Typography>
                    </Grid>
                    {displayPlus && 
                    <>
                    <Grid size={1}>
                        <Tooltip title="Add this activity to a Planner">
                        <Link href={`/user/planners/addPlanner/${activity.id}`}>
                            <IconButton
                            sx={{alignSelf:"right",}}
                            color="warning"
                            >
                            <FaCircleCheck />
                            </IconButton>
                        </Link>
                        </Tooltip>
                    </Grid> 
                    <Grid size={1}>
                        <Tooltip title="Create a Post for this Activity">
                        <Link href={`/user/posts/createPost/${activity.id}`}>
                            <IconButton
                            sx={{alignSelf:"right",}}
                            color="info"
                            >
                            <FaCirclePlus />
                            </IconButton>
                        </Link>
                        </Tooltip>
                    </Grid>
                    </>}
                </Grid>
                <Typography color='info' variant='subtitle2'>{activity.location.name}</Typography>
                {activity.description && <Typography variant='body1'>{activity.description}</Typography>}
            </Stack>
        </Paper>
        </Container>
    );
};

export default DisplayActivity;