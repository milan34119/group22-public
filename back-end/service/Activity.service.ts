import { Activity } from "../model/Activity";
import ActivityDb from "../repository/Activity.db";
import { ActivityInput } from "../types";
import LocationService from "./Location.service";

const getActivity = async (id:number):Promise<Activity> => {
    const returnActivity = await ActivityDb.getActivity(id)
    if(!returnActivity) throw new Error("No activity with that id");
    return returnActivity
}

const getAllActivities = async ():Promise<Activity[]> => {
    return await ActivityDb.getAllActivities()
}

const createActivity = async ({name, description, location:LocationInput}:ActivityInput):Promise<Activity> => {
    const location = await LocationService.getLocation(LocationInput.id)
    const activity = new Activity({name, description, location})
    return await ActivityDb.createActivity(activity)
}

export default {
    getActivity,
    getAllActivities,
    createActivity,
}