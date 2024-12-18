import Header from "@components/Header"
import CreatePlannerForm from "@components/planners/CreatePlannerForm"
import CreatePostForm from "@components/posts/CreatePostForm";
import { Typography } from "@mui/material";
import { Activity } from "@types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ActivityService from "service/ActivityService";
import withAuth from "util/withAuth";

const createPost = () => {
    const [activity, setActivity] = useState<Activity|null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const { activityId } = router.query;


    useEffect(() => {
        const fetchActivity = async () => {
            if (!activityId) return;

            try {
                setLoading(true);
                const response = await ActivityService.getActivityById(activityId as unknown as number);

                if (!response.ok) {
                    return;
                }

                const activityData = await response.json() as Activity;
                setActivity(activityData);

            } catch (err) {
            } finally {
                setLoading(false);
            }
        };

        fetchActivity();
    }, [activityId]);
    return (
        <>
            <Header/>
            {activity && <CreatePostForm activity={activity}/>}
        </>
    )
}

export default withAuth(createPost)