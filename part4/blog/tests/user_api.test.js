const mongoose = require('mongoose');
const supertest = require('supertest');
const User = require('../models/user');
const app = require('../app');

const api = supertest(app);

const initialUsers = [
    {
        username: 'user1',
        password: 'user1',
        name: 'user1',
    },
    {
        username: 'user2',
        password: 'user2',
        name: 'user2',
    },
];

beforeEach(async () => {
    await User.deleteMany({});
    const userObjects = initialUsers.map((user) => new User(user));
    const promiseArray = userObjects.map((user) => {
        user.save();
    });
    await Promise.all(promiseArray);
});

afterAll(() => {
    mongoose.connection.close();
});

// test('all users returned with GET', async () => {
//     const resp = await api.get('/api/users');
//     expect(resp.body).toHaveLength(initialUsers.length);
// });

test('new user is added', async () => {
    const newUser = {
        username: 'user3',
        password: 'user3',
        name: 'user3',
    };

    const result = await api.post('/api/users').send(newUser);
    expect(result.body.username).toBe('user3');
});

test('no username is not added', async () => {
    const newUser = {
        password: 'user3',
        name: 'user3',
    };

    await api.post('/api/users').send(newUser).expect(400);
});

test('no password is not added', async () => {
    const newUser = {
        username: 'user3',
        name: 'user3',
    };

    await api.post('/api/users').send(newUser).expect(400);
});

