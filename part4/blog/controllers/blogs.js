const blogsRouter = require('express').Router();
const mongoose = require('mongoose');
const Blog = require('../models/blog');
const logger = require('../utils/logger');

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user').exec();
    logger.info(`GET ${request.baseUrl} || user: ${request.user}`);
    response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
    const body = request.body;
    const token = request.token;
    const decodedToken = request.decodedToken;
    const user = request.user;
    const username = request.username;

    logger.info(`POST ${request.baseUrl} || user: ${username}`);

    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' });
    }

    // lookup the user from the jwt id
    const blogBody = {
        ...body,
        user: user,
    };
    const blog = new Blog(blogBody);
    await blog.populate('user').execPopulate();

    if (!blog.title || !blog.author || !blog.url) {
        return response.status(400).send({
            error: 'bad request due to missing attributes',
        });
    } else if (!blog.likes) {
        blog['likes'] = 0;
    }

    const savedBlog = await blog.save();

    // now add this to the user's blogs array...
    user.blogs.push(savedBlog._id);
    await user.save();

    response.json(savedBlog);
});

blogsRouter.delete('/', async (request, response) => {
    const body = request.body;
    const token = request.token;
    const decodedToken = request.decodedToken;
    const username = request.username;

    logger.info(`DELETE ${request.baseUrl} id: ${body._id} user: ${username}`);

    // see which user is associated with the blog
    const requestedBlog = await Blog.findById(body._id);
    const blogUserId = requestedBlog.user;
    console.log(`blogId: ${requestedBlog}, blogUserId: ${blogUserId}`);

    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' });
    } else if (blogUserId.toString() !== decodedToken.id) {
        return response
            .status(401)
            .json({ error: 'user is not authorised to delete this blog' });
    }

    if (!body._id) {
        return response.status(400).send({
            error: 'missing id',
        });
    }

    const id = mongoose.Types.ObjectId(body._id);
    const result = await Blog.deleteOne({ _id: id });
    console.log(`Deleted ${result.n} documents.`);
    response.status(200).end();
});

blogsRouter.put('/:id', async (request, response) => {
    const id = request.params.id;
    logger.info(`PUT ${request.baseUrl}`);
    console.log('params id:', id);
    const body = request.body;
    // have to use findOne to get ONE doc instead of arr
    const doc = await Blog.findOne({ _id: id });

    console.log(doc);

    // update each field of the doc
    doc.title = body.title;
    doc.author = body.author;
    doc.url = body.url;
    doc.likes = body.likes;
    await doc.save();

    response.json(doc);
});

module.exports = blogsRouter;
