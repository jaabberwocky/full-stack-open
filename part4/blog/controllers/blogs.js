const blogsRouter = require('express').Router();
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
    logger.info(`DELETE ${request.baseUrl}`);
});

module.exports = blogsRouter;
