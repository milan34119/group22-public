import { Activity } from '../../model/Activity';
import { Location } from '../../model/Location';

describe('Activity Model', () => {
    test('moet een Activity instantie aanmaken', () => {
        const location = new Location({
            id: 1,
            name: 'Zwembad',
            description: 'Binnenzwembad',
        });

        const activity = new Activity({
            id: 1,
            name: 'Zwemmen',
            description: 'Zwemactiviteit',
            location,
        });

        expect(activity.id).toBe(1);
        expect(activity.name).toBe('Zwemmen');
        expect(activity.description).toBe('Zwemactiviteit');
        expect(activity.location).toBe(location);
    });

    test('moet een fout gooien als verplichte velden ontbreken', () => {
        const location = new Location({
            id: 1,
            name: 'Zwembad',
            description: 'Binnenzwembad',
        });

        expect(() => {
            new Activity({
                name: '',
                location,
            });
        }).toThrow('name is required for Activity');

        expect(() => {
            new Activity({
                name: 'Zwemmen',
                location: null,
            });
        }).toThrow('location is required for Activity');
    });

    test('moet een Activity instantie aanmaken van Prisma data', () => {
        const prismaActivity = {
            id: 1,
            name: 'Zwemmen',
            description: 'Zwemactiviteit',
            location: {
                id: 1,
                name: 'Zwembad',
                description: 'Binnenzwembad',
            },
        };

        const activity = Activity.from(prismaActivity);

        expect(activity.id).toBe(1);
        expect(activity.name).toBe('Zwemmen');
        expect(activity.description).toBe('Zwemactiviteit');
        expect(activity.location.name).toBe('Zwembad');
        expect(activity.location.description).toBe('Binnenzwembad');
    });
});
