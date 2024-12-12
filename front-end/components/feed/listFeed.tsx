import { useEffect, useState } from "react";
import { Post } from "@types";
import postService from "service/PostService";
import { error } from "console";
import FeedItem from "./feedItem";

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

        <div>
            {isLoading ? (<p>Loading...</p>):(
                posts.map((post) => (<FeedItem key={post.id} post={post}/>))
            )}
        </div>
        </>
    );
};

export default ListFeed;