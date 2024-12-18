import { Post } from '../../model/Post';
import { Activity } from '../../model/Activity';

describe('Post Model', () => {
    test('moet een Post instantie aanmaken', () => {
        const activity = new Activity({
            id: 1,
            name: 'Zwemmen',
            location: { id: 1, name: 'Zwembad', description: 'Binnenzwembad' },
        });

        const post = new Post({
            id: 1,
            name: 'Dagje Zwemmen',
            description: 'We hebben een geweldige tijd gehad in het zwembad.',
            comments: ['Leuk!', 'Ziet er geweldig uit!'],
            createdAt: new Date(),
            activity,
        });

        expect(post.id).toBe(1);
        expect(post.name).toBe('Dagje Zwemmen');
        expect(post.description).toBe('We hebben een geweldige tijd gehad in het zwembad.');
        expect(post.comments).toEqual(['Leuk!', 'Ziet er geweldig uit!']);
        expect(post.createdAt).toBeInstanceOf(Date);
        expect(post.activity).toBe(activity);
    });

    test('moet een fout gooien als verplichte velden ontbreken', () => {
        const activity = new Activity({
            id: 1,
            name: 'Zwemmen',
            location: { id: 1, name: 'Zwembad', description: 'Binnenzwembad' },
        });

        expect(() => {
            new Post({
                name: '',
                comments: [],
                activity,
            });
        }).toThrow('name is required for Post.');

        expect(() => {
            new Post({
                name: 'Dagje Zwemmen',
                comments: [],
                activity: null,
            });
        }).toThrow('activity is required for Post.');
    });

    test('moet een Post instantie aanmaken van Prisma data', () => {
        const prismaPost = {
            id: 1,
            name: 'Dagje Zwemmen',
            description: 'We hebben een geweldige tijd gehad in het zwembad.',
            comments: ['Leuk!', 'Ziet er geweldig uit!'],
            activity: {
                id: 1,
                name: 'Zwemmen',
                location: { id: 1, name: 'Zwembad', description: 'Binnenzwembad' },
            },
        };

        const post = Post.from(prismaPost);

        expect(post.id).toBe(1);
        expect(post.name).toBe('Dagje Zwemmen');
        expect(post.description).toBe('We hebben een geweldige tijd gehad in het zwembad.');
        expect(post.comments).toEqual(['Leuk!', 'Ziet er geweldig uit!']);
        expect(post.activity.name).toBe('Zwemmen');
        expect(post.activity.location.name).toBe('Zwembad');
    });
});
