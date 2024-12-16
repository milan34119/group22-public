import { User } from "@types";
import { useState, useEffect } from "react";
import UserService from "service/UserService";
import ListUserItem from "./listUsersItem";

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userResponse = await UserService.getAllUsers()
                const userData = await userResponse.json()
                setUsers(userData)
                setLoading(false)
            }
            catch (error){
                console.error("Error fetching data:", error)
            }
        } ;

        fetchUsers();
    }, []);

    const removeUser = async (id:number) => {
        await UserService.deleteUser(id)
        setUsers(users.filter(user => user.id != id))
    }

    return (
        <>
        <div>
            {isLoading ? (<p>Loading...</p>):(
                users.map((user) => (<div key={user.id} ><ListUserItem user={user} deleteUser={removeUser}/></div>))
            )}
        </div>
        </>
    );
};

export default UserList;