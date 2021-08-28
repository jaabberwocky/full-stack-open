const mongoose = require('mongoose');
const supertest = require('supertest');
const Blog = require('../models/blog');
const app = require('../app');

const api = supertest(app);

const initialBlogs = [
    {
        title: 'Hold me back!',
        author: 'James Arthur',
        url: 'www.com',
        likes: '17',
    },
    {
        title: "Woohoo let's go",
        author: 'Tom Pippin',
        url: 'www.13.com',
        likes: '21',
    },
];

beforeEach(async () => {
    await Blog.deleteMany({});
    const blogObjects = initialBlogs.map((blog) => new Blog(blog));
    const promiseArray = blogObjects.map((blog) => {
        blog.save();
    });
    await Promise.all(promiseArray);
});

afterAll(() => {
    mongoose.connection.close();
});

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(initialBlogs.length);
});

test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs');

    const contents = response.body.map((r) => r.title);
    expect(contents).toContain("Woohoo let's go");
});

test('blog without author and url is not added', async () => {
    const newBlog = {
        title: 'hello world',
    };
    await api.post('/api/blogs').send(newBlog).expect(400);
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(initialBlogs.length);
});

test('blog without title and url is not added', async () => {
    const newBlog = {
        author: 'hello world',
    };
    await api.post('/api/blogs').send(newBlog).expect(400);
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(initialBlogs.length);
});

test('blog is added with post', async () => {
    const newBlog = {
        title: 'hello world',
        author: 'sir stamford raffles',
        url: 'www.raffles.com',
        likes: 17,
    };

    await api.post('/api/blogs').send(newBlog).expect(200);
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(initialBlogs.length + 1);
});

test('blog without likes is added as default zero', async () => {
    const newBlog = {
        title: 'hello world',
        author: 'sir stamford raffles',
        url: 'www.raffles.com',
    };

    await api.post('/api/blogs').send(newBlog).expect(200);
    const response = await api.get('/api/blogs');
    expect(response.body[response.body.length - 1].likes).toBe(0);
});

test('blogs have unique id', async () => {
    const response = await api.get('/api/blogs');

    for (let blog of response.body) {
        expect(blog._id).toBeDefined();
    }
});

test('delete blog gets a 200 in return', async () => {
    const newBlog = {
        title: 'hello world',
        author: 'sir stamford raffles',
        url: 'www.raffles.com',
    };
    const result = await api.post('/api/blogs').send(newBlog);
    const id = result.body._id;

    const deleteBlog = {
        _id: id,
    };
    await api.delete('/api/blogs').send(deleteBlog).expect(200);
});

test('PUT blog gets a 200 in return', async () => {
    const newBlog = {
        title: 'hello world',
        author: 'sir stamford raffles',
        url: 'www.raffles.com',
    };
    const result = await api.post('/api/blogs').send(newBlog);
    const id = result.body._id;

    const updatedBlog = {
        title: 'hello world 2',
        author: 'sir stamford raffles',
        url: 'www.raffles.com',
    };
    const resp = await api.put(`/api/blogs/${id}`).send(updatedBlog);
    expect(resp.body.title).toBe('hello world 2');

    const deleteBlog = {
        _id: id,
    };
    await api.delete('/api/blogs').send(deleteBlog);
});
