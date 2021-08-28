const blogsRouter = require('express').Router();
const mongoose = require('mongoose');
const Blog = require('../models/blog');
const logger = require('../utils/logger');

blogsRouter.get('/', async (request, response) => {
    logger.info(`GET ${request.baseUrl}`);
    const blogs = await Blog.find({});
    response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
    logger.info(`POST ${request.baseUrl}`);
    const blog = new Blog(request.body);

    if (!blog.title || !blog.author || !blog.url) {
        return response.status(400).send({
            error: 'bad request due to missing attributes',
        });
    } else if (!blog.likes) {
        blog['likes'] = 0;
    }

    const savedBlog = await blog.save();
    response.json(savedBlog);
});

blogsRouter.delete('/', async (request, response) => {
    const body = request.body;
    logger.info(`DELETE ${request.baseUrl} id: ${body._id}`);

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
    console.log('params id:', id);
    const body = request.body;
    // have to use findOne to get ONE doc instead of arr
    const doc = await Blog.findOne({_id: id}); 

    console.log(doc);

    // update each field of the doc
    doc.title = body.title;
    doc.author = body.author;
    doc.url = body.url;
    doc.likes = body.likes
    await doc.save();

    response.json(doc);

});

module.exports = blogsRouter;
