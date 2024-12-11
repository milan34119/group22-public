import { connect } from "http2";
import { Activity } from "../model/Activity"
import database from "../util/database"

const getActivity = async(id:number): Promise<Activity|null> => {
    const prismaActivity = await database.activity.findFirst({
        where: {
            id
        },
        include: {
            location: true
        }
    });
    return prismaActivity ? Activity.from(prismaActivity) : null;
}
const getAllActivities = async (): Promise<Activity[]> => {
    const prismaActivities = await database.activity.findMany({
        include: {
            location: true
        }
    });
    return prismaActivities.map(activity => Activity.from(activity));
}

const createActivity = async ({name, description, location}: Activity): Promise<Activity> => {
    const prismaActivity = await database.activity.create({
        data: {
            name,
            description,
            location: {
                connect: {
                    id: location.id
                }
            }
        },
        include: {
            location: true
        }
    });
    return Activity.from(prismaActivity)
}

export default{
    getActivity,
    getAllActivities,
    createActivity,
}