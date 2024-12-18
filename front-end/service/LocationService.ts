const createLocation = async (content:{name:string}) => {
    const token = localStorage.getItem('token');
const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/location/`, {
    body: JSON.stringify(content),
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    },
})

return response
}

const LocationService = {
    createLocation,
}

export default LocationService