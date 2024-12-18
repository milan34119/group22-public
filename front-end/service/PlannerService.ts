
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

const PlannerService = {
    createPlannerForUser,
}

export default PlannerService