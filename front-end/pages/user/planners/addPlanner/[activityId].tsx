import Header from "@components/Header"
import DisplayPlanner from "@components/planners/Planner";
import { Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2"
import { Activity, Planner } from "@types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ActivityService from "service/ActivityService";
import withAuth from "util/withAuth";

const addActivityToPlanner = () => {
    const [activity, setActivity] = useState<Activity|null>(null);
    const [planners, setPlanners] = useState<Planner[]>([]);
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
            {activity && planners && <>
                <Grid container spacing={2} padding={2}>
                {planners.map((planner) => (
                <Grid size={6}>    
                    <Paper elevation={3} sx={{p: 3 }}>
                        <DisplayPlanner key={planner.id} planner={planner}/>
                    </Paper>
                </Grid>
                ))}
            </Grid>
            </>}
        </>
    )
}

export default withAuth(addActivityToPlanner)