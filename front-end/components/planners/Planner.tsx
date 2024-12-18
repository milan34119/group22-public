import DisplayActivity from '@components/Activity/Activity';
import { Card, CardContent, Typography, IconButton, Container, Stack } from '@mui/material';
import { Activity, Planner, Post } from '@types';
import { FaCircleXmark } from 'react-icons/fa6';

type Props = {
    planner: Planner
};

const DisplayPlanner: React.FC<Props> = ({ planner }: Props) => {
    return (
        <Container>
            <Stack>
                <Typography variant='h5'>{planner.name}</Typography>
                {planner.description && <Typography variant='body1'>{planner.description}</Typography>}

                <Stack>
                    {planner.activities.map(activity => <DisplayActivity activity={activity}/>)}
                </Stack>
            </Stack>
        </Container>
    );
};

export default DisplayPlanner;