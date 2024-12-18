import Header from "@components/Header"
import CreatePlannerForm from "@components/planners/CreatePlannerForm"
import CreatePostForm from "@components/posts/CreatePostForm"
import { Typography } from "@mui/material"
import withAuth from "util/withAuth"

const createPost = () => {
    return (
        <>
            <Header/>
            <CreatePostForm/>
        </>
    )
}

export default withAuth(createPost)