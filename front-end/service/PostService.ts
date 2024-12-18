import { Activity, Post } from "@types";

const getAllPosts = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/`, {
        method: 'GET',
        headers: {
        }
    })

    return response
}

const createPost = async (content:{name:string, description?:string, activity:Activity}, username:string) => {
    const token = localStorage.getItem('token');
const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${username}`, {
    body: JSON.stringify(content),
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    },
})

return response
}

const addCommentToPost = async (content: {comment:string}, id:number) => {
    const token = localStorage.getItem('token');

    const response =  await fetch(process.env.NEXT_PUBLIC_API_URL + `/post/addComment/${id}`, {
        method: 'PUT',
        body: JSON.stringify(content),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    return response
}

const postService = {
    getAllPosts,
    createPost,
    addCommentToPost,
}

export default postService