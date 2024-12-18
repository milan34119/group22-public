import { Planner } from '../../model/Planner';
import { Activity } from '../../model/Activity';

describe('Planner Model', () => {
    test('moet een Planner instantie aanmaken', () => {
        const activity = new Activity({
            id: 1,
            name: 'Zwemmen',
            location: { id: 1, name: 'Zwembad', description: 'Binnenzwembad' },
        });

        const planner = new Planner({
            id: 1,
            name: 'Vakantieplanning',
            description: 'Planning voor de zomervakantie',
            activities: [activity],
        });

        expect(planner.id).toBe(1);
        expect(planner.name).toBe('Vakantieplanning');
        expect(planner.description).toBe('Planning voor de zomervakantie');
        expect(planner.activities).toEqual([activity]);
    });

    test('moet een fout gooien als verplichte velden ontbreken', () => {
        const activity = new Activity({
            id: 1,
            name: 'Zwemmen',
            location: { id: 1, name: 'Zwembad', description: 'Binnenzwembad' },
        });

        expect(() => {
            new Planner({
                name: '',
                activities: [activity],
            });
        }).toThrow('name is required for Planner');

        expect(() => {
            new Planner({
                name: 'Vakantieplanning',
                activities: [],
            });
        }).not.toThrow();
    });

    test('moet een Planner instantie aanmaken van Prisma data', () => {
        const prismaPlanner = {
            id: 1,
            name: 'Vakantieplanning',
            description: 'Planning voor de zomervakantie',
            activities: [
                {
                    id: 1,
                    name: 'Zwemmen',
                    location: { id: 1, name: 'Zwembad', description: 'Binnenzwembad' },
                },
            ],
        };

        const planner = Planner.from(prismaPlanner);

        expect(planner.id).toBe(1);
        expect(planner.name).toBe('Vakantieplanning');
        expect(planner.description).toBe('Planning voor de zomervakantie');
        expect(planner.activities.length).toBe(1);
        expect(planner.activities[0].name).toBe('Zwemmen');
        expect(planner.activities[0].location.name).toBe('Zwembad');
    });
});
