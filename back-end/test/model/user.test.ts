import { User, extendedUser } from '../../model/User';
import { Post } from '../../model/Post';

test('given valid user, then create user successfully', () => {
    const user = new extendedUser({
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: 'lalala123',
        posts: []
    });
    expect(user.getId()).toBe(1);
    expect(user.getEmail()).toBe('test@example.com');
    expect(user.name).toBe('Test User');
    expect(user.password).toBe('lalala123');
    expect(user.getPosts()).toEqual([]);
});

test('given valid user, then match password successfully', () => {
    const user = new User({
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: 'lalala123',
    });
    expect(user.matchPassword('lalala123')).toBe(true);
    expect(user.matchPassword('wrongpassword')).toBe(false);
});

test('given valid user, then add post successfully', () => {
    const user = new extendedUser({
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: 'lalala123',
        posts: []
    });
    const post = new Post({id:1, title:'Test Title', content:'Test Content'});
    user.addPost(post);
    expect(user.getPosts()).toContain(post);
});

test('given invalid user, then throw error when missing name', () => {
    const user = { id: 1, name: '', email: 'test@example.com', password: 'lalala123' };
    expect(() => new User(user)).toThrow('User name is required');
});

test('given invalid user, then throw error when missing email', () => {
    const user = { id: 1, name: 'Test User', email: '', password: 'lalala123' };
    expect(() => new User(user)).toThrow('User email is required');
});

test('given invalid user, then throw error when missing password', () => {
    const user = { id: 1, name: 'Test User', email: 'test@example.com', password: '' };
    expect(() => new User(user)).toThrow('User password is required');
});

// id: number;
// name: string;
// email: string;
// password: string;
// posts: Post[];
