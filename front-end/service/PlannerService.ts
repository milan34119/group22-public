
const createPlannerForUser = async (content: {name:string, description?: string}, username:string) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/planner/create/${username}`, {
        body: JSON.stringify(content),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })

    return response
}

const addActivityToPlanner = async (activityId: number, plannerId: number) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/planner/add/${activityId}/to/${plannerId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })

    return response
}

const PlannerService = {
    createPlannerForUser,
    addActivityToPlanner,
}

export default PlannerService