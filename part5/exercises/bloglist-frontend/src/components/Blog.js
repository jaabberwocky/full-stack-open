import React, { useState } from 'react';
import { Card } from 'react-bootstrap';

const Blog = ({ blog }) => {
    const [visible, setVisible] = useState(false);

    const showWhenVisible = { display: visible ? '' : 'none' };
    const showWhenNotVisible = { display: visible ? 'none' : '' };

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{blog.title}</Card.Title>
                <div style={showWhenNotVisible}>
                    <button onClick={() => setVisible(true)}>view</button>
                </div>
                <div style={showWhenVisible}>
                    <button onClick={() => setVisible(false)}>hide</button>
                    <Card.Subtitle className="mb-2 text-muted">
                        {blog.author}
                    </Card.Subtitle>
                    <Card.Text>URL: {blog.url}</Card.Text>
                </div>
            </Card.Body>
        </Card>
    );
};

export default Blog;
