import { Post } from "@types";

const getAllPosts = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response
}

const postService = {
    getAllPosts,
}

export default postService