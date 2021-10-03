import React from 'react'
const Blog = ({blog}) => (
  <div>
    Title:<b>{blog.title}</b> || Author: <i>{blog.author}</i>
  </div>  
)

export default Blog