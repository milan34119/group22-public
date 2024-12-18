import {
    Planner as PlannerPrisma,
    Activity as ActivityPrisma,
    Location as LocationPrisma,
} from '@prisma/client';
import { Activity } from './Activity';

export class Planner {
    readonly id: number;
    readonly name: string;
    readonly description?: string;
    readonly activities: Activity[];

    constructor(planner: {
        id?: number;
        name: string;
        description?: string;
        activities: Activity[];
    }) {
        this.validate(planner);

        this.id = planner.id;
        this.name = planner.name;
        this.description = planner.description;
        this.activities = planner.activities;
    }

    validate(planner: { id?: number; name: string; description?: string; activities: Activity[] }) {
        if (!planner.name) {
            throw new Error('name is required for Planner');
        }
    }

    // static from({
    //     id,
    //     name,
    //     description,
    //     activities
    // }: PlannerPrisma & {activities: (ActivityPrisma & {location: LocationPrisma})[]}) {
    //     return new Planner({
    //         id,
    //         name,
    //         description,
    //         activities: activities.map(activity => Activity.from(activity))
    //     })
    // }

    static from({
        id,
        name,
        description,
        activities,
    }: PlannerPrisma & { activities?: (ActivityPrisma & { location?: LocationPrisma })[] }) {
        return new Planner({
            id,
            name,
            description,
            activities:
                activities?.map((activity) =>
                    Activity.from(activity as ActivityPrisma & { location: LocationPrisma })
                ) || [],
        });
    }
}
