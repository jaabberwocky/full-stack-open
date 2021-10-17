import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import blogService from '../services/blogs';

const Blog = ({ blog, blogs, setBlogs }) => {
    const [visible, setVisible] = useState(false);
    const [localBlog, setLocalBlog] = useState(blog);

    const showWhenVisible = { display: visible ? '' : 'none' };
    const showWhenNotVisible = { display: visible ? 'none' : '' };

    const increaseLikes = async (shouldIncrease) => {
        const currentLikes = localBlog.likes;
        const updatedBlog = shouldIncrease
            ? { ...localBlog, likes: currentLikes + 1 }
            : { ...localBlog, likes: currentLikes - 1 };
        const resp = await blogService.updateBlog(updatedBlog);
        setLocalBlog(resp);
    };

    const handleDelete = async () => {
        const deleteId = localBlog._id;
        console.log(`trying to delete ${deleteId}...`);
        if (window.confirm(`Do you really want to delete ${localBlog.title}?`)) {
            const resp = await blogService.deleteBlog(deleteId);
            console.log(resp);
            const filteredBlogs = blogs.filter(blog => blog._id !== deleteId);
            setBlogs(filteredBlogs);
        }
    }

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{localBlog.title}</Card.Title>
                <div style={showWhenNotVisible}>
                    <button onClick={() => setVisible(true)}>view</button>
                </div>
                <div style={showWhenVisible}>
                    <button onClick={() => setVisible(false)}>hide</button>
                    <Card.Subtitle className="mb-2 text-muted">
                        {localBlog.author}
                    </Card.Subtitle>
                    <Card.Text>URL: {localBlog.url}</Card.Text>
                    <Card.Text>Likes: {localBlog.likes}</Card.Text>
                    <button onClick={() => increaseLikes(true)}>+</button>
                    <button onClick={() => increaseLikes(false)}>-</button>
                    {'\n'}
                    <button onClick={() => handleDelete()}>delete</button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default Blog;
