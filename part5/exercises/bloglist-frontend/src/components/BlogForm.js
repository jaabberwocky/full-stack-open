import React, { useState } from 'react';

const BlogForm = ({
    handlePostForm,
    title,
    author,
    url,
    setTitle,
    setAuthor,
    setUrl,
}) => {
    const [formVisible, setFormVisible] = useState(false);
    const showWhenVisible = { display: formVisible ? '' : 'none' };
    const showWhenNotVisible = { display: formVisible ? 'none' : '' };

    return (
        <React.Fragment>
            <div style={showWhenNotVisible}>
                <button onClick={() => setFormVisible(true)}>show form</button>
            </div>
            <div style={showWhenVisible}>
                <form onSubmit={handlePostForm}>
                    title:
                    <input
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                    author:
                    <input
                        type="text"
                        value={author}
                        name="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                    url:
                    <input
                        type="text"
                        value={url}
                        name="URL"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                    <button type="submit">create</button>
                </form>
                <button onClick={() => setFormVisible(false)}>hide form</button>
            </div>
        </React.Fragment>
    );
};

export default BlogForm;
