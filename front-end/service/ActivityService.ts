import { Location } from "@types";

const getActivityById = async (id:number) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/activity/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })

    return response
}

const createActivity = async (content: {
    name: string;
    description?: string;
    location:Location
}) => {
    const token = localStorage.getItem('token');
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/activity/', {
        method: 'POST',
        body: JSON.stringify(content),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
};

const ActivityService = {
    getActivityById,
    createActivity
}

export default ActivityService