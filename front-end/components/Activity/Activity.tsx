import { Card, CardContent, Typography, IconButton, Container, Stack, Paper } from '@mui/material';
import { Activity } from '@types';
import { FaCircleXmark } from 'react-icons/fa6';

type Props = {
    activity: Activity
};

const DisplayActivity: React.FC<Props> = ({ activity }: Props) => {
    return (
        <Paper elevation={1} sx={{p: 2 }}>
            <Stack>
                <Typography  variant='h5'>{activity.name}</Typography>
                <Typography color='info' variant='subtitle2'>{activity.location.name}</Typography>
                {activity.description && <Typography variant='body1'>{activity.description}</Typography>}
            </Stack>
        </Paper>
    );
};

export default DisplayActivity;