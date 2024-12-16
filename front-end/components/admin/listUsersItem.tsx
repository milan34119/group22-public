import { Container, Typography } from "@mui/material";
import { User } from "@types";
import { FaCircleXmark } from "react-icons/fa6";

type Props = {
    user: User;
    deleteUser: (id:number) => void;
}

const ListUserItem: React.FC<Props> = ({user, deleteUser}:Props) => {
    return (
        <>
        {(user.username != localStorage.getItem("loggedInUser")) && <div className="absolute right-0 top-0 mr-0.5 mt-0.5">
            <FaCircleXmark className="cursor-pointer" onClick={() => user.id ? deleteUser(user.id): console.log("user has no id")} />
        </div>}
        <Container component="main" maxWidth="xs">
            <Typography>
                {user.name}
            </Typography>
            <Typography>
                {user.username}
            </Typography>
            <Typography>
                {user.email}
            </Typography>
            <Typography>
                {user.role}
            </Typography>
        </Container>
        
        
        </>
    );
};

export default ListUserItem;