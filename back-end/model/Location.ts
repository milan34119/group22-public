import { Location as LocationPrisma } from '@prisma/client';
import { Activity } from './Activity';

export class Location {
    readonly id: number;
    readonly name: string;
    readonly description?: string;
    readonly activities?: Activity[];

    constructor(location: {
        id?: number;
        name: string;
        description?: string;
        activities?: Activity[];
    }) {
        this.validate(location);

        this.id = location.id;
        this.name = location.name;
        this.description = location.description;
        this.activities = location.activities;
    }

    validate(location: { name: string }) {
        if (!location.name) {
            throw new Error('name is required for Location');
        }
    }

    static from({ id, name, description }: LocationPrisma) {
        return new Location({
            id,
            name,
            description,
        });
    }
}
