const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const logger = require("../utils/logger");

blogsRouter.get("/", (request, response, next) => {
  logger.info(`GET ${request.baseUrl}`)
  Blog.find({})
    .then((blogs) => {
      response.json(blogs);
      logger.info(`Response: ${blogs}`)
    })
    .catch((e) => next(e));
});

blogsRouter.post("/", (request, response, next) => {
  logger.info(`POST ${request.baseUrl}`)
  const blog = new Blog(request.body);

  if (!blog.title || !blog.author || !blog.url || !blog.likes) {
    return response.status(400).send({
      error: "bad request due to missing attributes",
    });
  }

  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    })
    .catch((e) => next(e));
});

module.exports = blogsRouter;
