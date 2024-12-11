import { Location } from "../model/Location"
import database from "../util/database"

const findlocationById = async (id:number): Promise<Location | null> => {
    const prismaLocation = await database.location.findUnique({
        where: {
            id
        }
    });
    return prismaLocation ? Location.from(prismaLocation) : null;
}

const findAllLocations = async (): Promise<Location[]> => {
    const prismaLocations = await database.location.findMany({

    })
    return prismaLocations.map((location) => Location.from(location))
}

const createLocation = async ({name, description, }: Location): Promise<Location> => {
    const prismaLocation = await database.location.create({
        data: {
            name,
            description
        },
    })
    return Location.from(prismaLocation)
}


export default{
    findlocationById,
    findAllLocations,
    createLocation,
}