import LocationDb from "../repository/Location.db"
import {Location} from "../model/Location"
import { LocationInput } from "../types"

const getAllLocations = async (): Promise<Location[]> => {
    return await LocationDb.findAllLocations()
}

const getLocation = async (id:number): Promise<Location> => {
    const returnLocation = await LocationDb.findlocationById(id)
    if(!returnLocation) throw new Error('no location with that ID');
    return returnLocation;
}

const createLocation = async ({
    name,
    description
}: LocationInput):Promise<Location> => {
    if(!name) throw new Error("location name is required");
    const createdLocation = new Location({name, description})
    return await LocationDb.createLocation(createdLocation)
}

export default{
    getAllLocations,
    getLocation,
    createLocation
}