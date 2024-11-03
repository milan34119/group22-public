const getAllUsers = async () => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/user', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
  };

  const getLecturerById = async (id: number) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/lecturers/${id}`, {
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
  const UserService = {
    getAllUsers,
    getLecturerById,
    login,
  };
  
  export default UserService;