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
                const postData = await postResponse.json();
                setPosts(postData);
                console.log("test");
                (postData as Post[]).forEach(post => parseTime(post.createdAt))
                setLoading(false)
            }
            catch (error){
                console.error("Error fetching data:", error)
            }
        } ;

        fetchPosts();
    }, []);

    const parseTime = (date:string) => {
        let dateParts = date.split(/[-T:.Z]/)
        dateParts.pop()
        dateParts.pop()
        dateParts[1] = String(parseInt(dateParts[1])- 1)
        const intDateParts = dateParts.map(part => parseInt(part))
        return new Date(intDateParts[0],intDateParts[1],intDateParts[2],intDateParts[3],intDateParts[4],intDateParts[5])
    }

    return (
        <>
        <p></p>
        <div>
            {isLoading ? (<p>Loading...</p>):(
                <Grid container spacing={2} padding={2}>
                    {posts.sort((a, b) => {
                        if (parseTime(a.createdAt) > parseTime(b.createdAt)) return -1;
                        return 1
                    }).map((post) => (
                    <Grid size={6} key={post.id}>    
                        <Paper elevation={3} sx={{p: 3 }}>
                            <DisplayPost post={post}/>
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