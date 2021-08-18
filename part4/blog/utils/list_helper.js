const _ = require("lodash");

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  // have to pass initial value as it is an array of objects
  return blogs.reduce((accum, currentBlog) => {
    return accum + currentBlog.likes;
  }, 0);
};

const favouriteBlog = (blogs) => {
  let highestBlog = {};

  for (let blog of blogs) {
    if (blog.likes > highestBlog.likes || highestBlog.likes === undefined) {
      highestBlog = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes,
      };
    }
  }
  return highestBlog;
};

const mostBlogs = (blogs) => {
  const authorCount = {};

  for (let blog of blogs) {
    if (blog.author in authorCount) {
      authorCount[blog.author] += 1;
    } else {
      authorCount[blog.author] = 1;
    }
  }

  const maxAuthor = _.maxBy(_.keys(authorCount), function (o) {
    return authorCount[o];
  });
  const blogCount = authorCount[maxAuthor];
  return maxAuthor === undefined || blogCount === undefined
    ? {}
    : {
        author: maxAuthor,
        blogs: blogCount,
      };
};

const mostLikes = (blogs) => {
  const authorCount = {};

  for (let blog of blogs) {
    if (blog.author in authorCount) {
      authorCount[blog.author] += blog.likes;
    } else {
      authorCount[blog.author] = blog.likes;
    }
  }

  const maxAuthor = _.maxBy(_.keys(authorCount), function (o) {
    return authorCount[o];
  });
  const likes = authorCount[maxAuthor];
  return maxAuthor === undefined || likes === undefined
    ? {}
    : {
        author: maxAuthor,
        likes: likes,
      };
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
