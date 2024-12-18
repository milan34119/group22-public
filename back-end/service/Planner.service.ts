import { Planner } from "../model/Planner";
import PlannerDb from "../repository/Planner.db";
import { PlannerInput } from "../types";
import ActivityService from "./Activity.service";

const getAllPlanners = async ():Promise<Planner[]> => {
    return await PlannerDb.getAllPlanners();
}

const getPlanner = async (id:number):Promise<Planner> => {
    const returnPlanner = await PlannerDb.getPlanner(id);
    if(!returnPlanner) throw new Error("No planner with that Id");
    return returnPlanner;
}

const createPlannerForUserByUsername = async ({
    name, 
    description, 
    activities:ActivitiesInput,
}:PlannerInput, userName: string):Promise<Planner> => {
    const activities =  ActivitiesInput ? await Promise.all( ActivitiesInput.map(activity => ActivityService.getActivity(activity.id))): [];
    const planner = new Planner({name, description, activities})
    return await PlannerDb.createPlannerForUserByUsername(planner, userName)
}

export default {
    getAllPlanners,
    getPlanner,
    createPlannerForUserByUsername,
}