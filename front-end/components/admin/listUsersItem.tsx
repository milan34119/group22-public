import { Card, CardContent, Typography, IconButton } from '@mui/material';
import { User } from '@/types';
import { FaCircleXmark } from 'react-icons/fa6';

type Props = {
    user: User;
    deleteUser: (id: number) => void;
};

const ListUserItem: React.FC<Props> = ({ user, deleteUser }: Props) => {
    return (
        <Card
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 2,
                position: 'relative',
            }}
        >
            <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6">{user.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                    {user.username}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {user.email}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {user.role}
                </Typography>
            </CardContent>

            {user.username != localStorage.getItem('loggedInUser') && (
                <IconButton
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                    color="error"
                    onClick={() => user.id && deleteUser(user.id)}
                >
                    <FaCircleXmark />
                </IconButton>
            )}
        </Card>
    );
};

export default ListUserItem;
