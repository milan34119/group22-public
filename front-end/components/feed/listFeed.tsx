import { useEffect, useState } from "react";
import { Post } from "@types";
import postService from "service/PostService";
import { error } from "console";
import DisplayPost from "@components/posts/Post";
import Grid from "@mui/material/Grid2";
import { Paper } from "@mui/material";

const ListFeed: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postResponse = await postService.getAllPosts()
                const postData = await postResponse.json()
                setPosts(postData)
                setLoading(false)
            }
            catch (error){
                console.error("Error fetching data:", error)
            }
        } ;

        fetchPosts();
    }, []);

    return (
        <>
        <p></p>
        <div>
            {isLoading ? (<p>Loading...</p>):(
                <Grid container spacing={2} padding={2}>
                    {posts.map((post) => (
                    <Grid size={6}>    
                        <Paper elevation={3} sx={{p: 3 }}>
                            <DisplayPost key={post.id} post={post}/>
                        </Paper>
                    </Grid>
                    ))}
                </Grid>                
            )}
        </div>
        </>
    );
};

export default ListFeed;