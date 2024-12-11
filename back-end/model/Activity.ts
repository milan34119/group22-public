import{
    Activity as ActivityPrisma,
    Location as LocationPrisma,
} from '@prisma/client'

import { Location } from './Location'

export class Activity {
    readonly id: number;
    readonly name: string;
    readonly description?: string;
    readonly location: Location;

    constructor(activity:{id?: number, name: string, description?: string, location: Location}) {
        this.validate(activity);

        this.id = activity.id;
        this.name = activity.name;
        this.description = activity.description;
        this.location = activity.location;
    }

    validate(activity:{id?: number, name: string, description?: string, location: Location}) {
        if(!activity.name){
            throw new Error("name is required for Activity")
        }
        if(!activity.location){
            throw new Error("location is required for Activity")
        }
    }

    static from({
        id, 
        name,
        description,
        location,
    }: ActivityPrisma & {location: LocationPrisma}) {
        return new Activity({
            id,
            name,
            description,
            location: Location.from(location)
        })
    }
}