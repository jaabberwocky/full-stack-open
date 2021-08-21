const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", (request, response, next) => {
  Blog.find({})
    .then((blogs) => {
      response.json(blogs);
    })
    .catch((e) => next(e));
});

blogsRouter.post("/", (request, response, next) => {
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
