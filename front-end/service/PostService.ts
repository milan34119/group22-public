import { Post } from "@types";

const getAllPosts = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/`, {
        method: 'GET',
        headers: {
        }
    })

    return response
}

const postService = {
    getAllPosts,
}

export default postService