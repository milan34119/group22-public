const getAllUsers = async () => {
    const token = localStorage.getItem('token');
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
};

const getUserById = async (id: number) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/user/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const getUserByUsername = async (username: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/user/username/${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
};

const loginUser = async (content: { username: string; password: string }) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/user/login', {
        method: 'POST',
        body: JSON.stringify(content),
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const getAllUserActivitiesByUsername = async (username: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/user/${username}/activities`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const addUser = async (content: {
    name: string;
    email: string;
    password: string;
    username: string;
}) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/user/registration', {
        method: 'POST',
        body: JSON.stringify(content),
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const deleteUser = async (id: number) => {
    console.log(id);
    const token = localStorage.getItem('token');

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/user/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
};

const UserService = {
    getAllUsers,
    getUserById,
    getUserByUsername,
    loginUser,
    addUser,
    deleteUser,
    getAllUserActivitiesByUsername,
};

export default UserService;
