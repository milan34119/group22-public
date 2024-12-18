import { Planner } from "../model/Planner";
import database from "../util/database";

const getAllPlanners = async ():Promise<Planner[]> => {
    const prismaPlanners =  await database.planner.findMany({
        include: {
            activities: {
                include: {
                    location: true
                }
            }
        }
    })
    return  prismaPlanners.map(planner => Planner.from(planner))
}

const getPlanner = async (id:number):Promise<Planner|null> => {
    const prismaPlanner = await database.planner.findFirst({
        where: {
            id
        },
        include: {
            activities: {
                include: {
                    location: true
                }
            }
        }
    });
    return prismaPlanner ? Planner.from(prismaPlanner) : null;
}

const createPlannerForUserByUsername = async ({name, description, activities}: Planner, username: string):Promise<Planner> => {
    const prismaPlanner = await database.planner.create({
        data: {
            name,
            description,
            activities: {
                connect: activities.map(activity => ({id: activity.id}))
            },
            User: {
                connect: {
                    username
                }
            }
        },
        include: {
            activities: {
                include: {
                    location: true
                }
            }
        }
    });
    return Planner.from(prismaPlanner)
}

const addActivityToPlanner = async (activityId: number, plannerId:number): Promise<Planner> => {
    const prismaPlanner = await database.planner.update({
        where: {
            id:plannerId
        },
        data: {
            activities: {
                connect: {id: activityId}
            }
        },
        include: {
            activities: {
                include: {
                    location: true
                }
            }
        }
    });
    return Planner.from(prismaPlanner)
}

export default {
    getPlanner,
    getAllPlanners,
    createPlannerForUserByUsername,
    addActivityToPlanner
}