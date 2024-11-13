import { Post } from '../../model/Post';

test('given valid post, then create post successfully', () => {
    const post = new Post({id:1, title:'Lalola', content:'Ik heb een toffe reis gehad',location:'Egypte'});
    expect(post.id).toBe(1);
    expect(post.title).toBe('Lalola');
    expect(post.content).toBe('Ik heb een toffe reis gehad');
    expect(post.location).toBe('Egypte');
});
