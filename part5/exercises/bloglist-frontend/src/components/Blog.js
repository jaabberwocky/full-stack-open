import React from 'react';
import { Card } from 'react-bootstrap';

const Blog = ({ blog }) => (
    <Card style={{ width: '18rem' }}>
        <Card.Body>
            <Card.Title>{blog.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
                {blog.author}
            </Card.Subtitle>
            <Card.Text>URL: {blog.url}</Card.Text>
        </Card.Body>
    </Card>
);

export default Blog;
