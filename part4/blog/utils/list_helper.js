// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
    // have to pass initial value as it is an array of objects
    return blogs.reduce((accum, currentBlog) => {return accum + currentBlog.likes}, 0)
}

module.exports = {
  dummy,
  totalLikes
};
