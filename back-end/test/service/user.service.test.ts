// import userService from '../../service/User.service';
// import userDb from '../../repository/user.db';
// import { User, extendedUser } from '../../model/User';
// import { Post } from '../../model/Post';

// const mockUserInput = {
//     id: 1,
//     name: 'Test User',
//     email: 'test@example.com',
//     password: 'lalala123',
// };

// const mockUser = new User(mockUserInput);
// const mockPost = new Post({id: 1, title:'Test Title', content:'Test Content', location:'Location'});

// let mockUserDbGetAllUsers: jest.SpyInstance<User[], [], any>;
// let mockUserDbGetUserById: jest.SpyInstance<User | null, [{ id: number }], any>;
// let mockUserDbGetAllUserActivitiesById: jest.SpyInstance<Post[], [{ id: number }], any>;
// let mockUserDbAddActivityToUserById: jest.SpyInstance<Post, [{ post: Post; id: number }], any>;
// let mockUserDbAddUser: jest.SpyInstance<
//     User,
//     [{ id: number; name: string; email: string; password: string }],
//     any
// >;
// let mockUserDbGetUserByEmailAndPassword: jest.SpyInstance<
//     User | null,
//     [{ email: string; password: string }],
//     any
// >;

// beforeEach(async () => {
//     mockUserDbGetAllUsers = jest.spyOn(userDb, 'getAllUsers');
//     mockUserDbGetUserById = jest.spyOn(userDb, 'getUserById');
//     mockUserDbGetAllUserActivitiesById = jest.spyOn(userDb, 'getAllUserPostsById');
//     mockUserDbAddActivityToUserById = jest.spyOn(userDb, 'addActivityToUserById');
//     mockUserDbAddUser = jest.spyOn(userDb, 'addUser');
//     mockUserDbGetUserByEmailAndPassword = jest.spyOn(userDb, 'getUserByEmailAndPassword');
// });

// afterEach(() => {
//     jest.clearAllMocks();
// });

// test('given existing users, when getAllUsers is called, then return all users', () => {
//     // given
//     mockUserDbGetAllUsers.mockReturnValue([mockUser]);

//     // when
//     const users = userService.getAllUsers();

//     // then
//     expect(users).toEqual([mockUser]);
// });

// test('given user id, when getUserById is called, then return user', () => {
//     // given
//     mockUserDbGetUserById.mockReturnValue(mockUser);

//     // when
//     const user = userService.getUserById(1);

//     // then
//     expect(user).toEqual(mockUser);
// });

// test('given non-existing user id, when getUserById is called, then throw error', () => {
//     // given
//     mockUserDbGetUserById.mockReturnValue(null);

//     // when
//     const getUserById = () => userService.getUserById(1);

//     // then
//     expect(getUserById).toThrow('User with id 1 does not exist.');
// });

// test('given user id, when getAllUserActivitiesById is called, then return all activities of user', () => {
//     // given
//     mockUserDbGetAllUserActivitiesById.mockReturnValue([mockPost]);

//     // when
//     const posts = userService.getAllUserActivitiesById(1);

//     // then
//     expect(posts).toEqual([mockPost]);
// });

// test('given post and user id, when addActivityToUserById is called, then add activity to user', () => {
//     // given
//     mockUserDbGetUserById.mockReturnValue(mockUser);
//     mockUserDbAddActivityToUserById.mockReturnValue(mockPost);

//     // when
//     const post = userService.addActivityToUserById(mockPost, 1);

//     // then
//     expect(post).toEqual(mockPost);
// });

// test('given new user, when addUser is called, then add the user', () => {
//     // given
//     mockUserDbGetAllUsers.mockReturnValue([]);
//     mockUserDbAddUser.mockReturnValue(mockUser);

//     // when
//     const user = userService.addUser(mockUserInput);

//     // then
//     expect(user).toEqual(mockUser);
// });

// test('given existing email, when addUser is called, then throw error', () => {
//     // given
//     mockUserDbGetAllUsers.mockReturnValue([mockUser]);

//     // when
//     const addUser = () =>
//         userService.addUser({
//             id: 2,
//             name: 'Another User',
//             email: 'test@example.com',
//             password: 'password123',
//         });

//     // then
//     expect(addUser).toThrow('User with that email already exists.');
// });

// test('given valid email and password, when login is called, then return user', () => {
//     // given
//     mockUserDbGetUserByEmailAndPassword.mockReturnValue(mockUser);

//     // when
//     const user = userService.login({ email: 'test@example.com', password: 'lalala123' });

//     // then
//     expect(user).toEqual(mockUser);
// });

// test('given invalid email or password, when login is called, then throw error', () => {
//     // given
//     mockUserDbGetUserByEmailAndPassword.mockReturnValue(null);

//     // when
//     const login = () => userService.login({ email: 'test@example.com', password: 'wrongpassword' });

//     // then
//     expect(login).toThrow('No user with that email and password exists');
// });
