const mongoose = require("mongoose");
const supertest = require("supertest");
const Blog = require("../models/blog");
const app = require("../app");

const api = supertest(app);

const initialBlogs = [
  {
    title: "Hold me back!",
    author: "James Arthur",
    url: "www.com",
    likes: "17",
  },
  {
    title: "Woohoo let's go",
    author: "Tom Pippin",
    url: "www.13.com",
    likes: "21",
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  console.log("Deleting test db...");
  const blogObjects = initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => {
    blog.save();
    console.log(`${blog.title} saved...`);
  });
  await Promise.all(promiseArray);
});

afterAll(() => {
  mongoose.connection.close();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlogs.length);
});

test("a specific blog is within the returned blogs", async () => {
  const response = await api.get("/api/blogs");

  const contents = response.body.map((r) => r.title);
  expect(contents).toContain("Woohoo let's go");
});

test("blog without content is not added", async () => {
  const newBlog = {
    title: "hello world",
  };
  await api.post("/api/blogs").send(newBlog).expect(400);
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(initialBlogs.length);
});
