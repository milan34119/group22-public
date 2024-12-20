import DisplayActivity from '@/components/Activity/Activity';
import { Card, CardContent, Typography, IconButton, Container, Stack } from '@mui/material';
import { Activity, Planner, Post } from '@/types';
import { FaCirclePlus } from 'react-icons/fa6';

type Props = {
    planner: Planner;
    displayIcons?: boolean;
};

const DisplayPlanner: React.FC<Props> = ({ planner, displayIcons = true }: Props) => {
    return (
        <Container>
            <Stack>
                <Typography variant="h5">{planner.name}</Typography>
                {planner.description && (
                    <Typography variant="body1">{planner.description}</Typography>
                )}

                <Stack>
                    {planner.activities.map((activity) => (
                        <DisplayActivity activity={activity} displayIcons={displayIcons} />
                    ))}
                </Stack>
            </Stack>
        </Container>
    );
};

export default DisplayPlanner;
