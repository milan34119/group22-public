const getAllUsers = async () => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/user', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
  };

  const getUserById = async (id: number) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
  };

const login = async (content: {email: string, password: string}) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/user/login', {
        method: "POST",
        body: JSON.stringify(content),
        headers: {
          'Content-Type': 'application/json',
        },
      })
}  

const getAllUserActivitiesById = async (id: number) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/user/${id}/activities`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
  };

const addUser = async (content: {id: number, name: string, email: string, password: string;}) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/user', {
        method: "POST",
        body: JSON.stringify(content),
        headers: {
          'Content-Type': 'application/json',
        },
      })
}  
  const UserService = {
    getAllUsers,
    getUserById,
    login,
    getAllUserActivitiesById,
    addUser,
  };
  
  export default UserService;