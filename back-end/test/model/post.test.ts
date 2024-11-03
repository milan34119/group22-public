import { Post } from '../../model/Post';

test('given valid post, then create post successfully', () => {
    const post = new Post(1, 'Lalola', 'Ik heb een toffe reis gehad', 'Egypte');
    expect(post.id).toBe(1);
    expect(post.title).toBe('Lalola');
    expect(post.content).toBe('Ik heb een toffe reis gehad');
    expect(post.location).toBe('Egypte');
    expect(post.createdAt).toBeInstanceOf(Date);
});

test('given invalid post, then throw error when missing id', () => {
    expect(() => new Post(0, 'Title', 'Content')).toThrow('Post ID is required');
});

test('given invalid post, then throw error when missing title', () => {
    expect(() => new Post(1, '', 'Content')).toThrow('Post title is required');
});

test('given invalid post, then throw error when missing content', () => {
    expect(() => new Post(1, 'Title', '')).toThrow('Post content is required');
});
