import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const NotificationMessage = ({ msg, notificationType }) => {
    let color;
    if (notificationType === 'error') {
        color = 'red';
    } else {
        color = 'green';
    }
    return (
        <div>
            <h1 style={{ color: color }}>{msg}</h1>
        </div>
    );
};

const BlogsList = ({ blogs }) => {
    return (
        <div>
            {blogs.map((blog) => (
                <Blog blog={blog} key={blog._id} />
            ))}
        </div>
    );
};

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [notificationType, setNotificationType] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const isLoggedIn = useRef(false);

    useEffect(() => {
        if (isLoggedIn.current) {
            blogService.getAll().then((blogs) => setBlogs(blogs));
        }
    }, [user]);

    useEffect(() => {
        // only runs on first render
        // due to empty array
        const loggedInBlogUser =
            window.localStorage.getItem('loggedInBlogUser');
        if (loggedInBlogUser) {
            const user = JSON.parse(loggedInBlogUser);
            setUser(user);
            isLoggedIn.current = true;
            blogService.setToken(user.token);
        }
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();
        console.log('attempting logging in with', username, password, '...');

        try {
            const user = await loginService.login({
                username,
                password,
            });
            window.localStorage.setItem(
                'loggedInBlogUser',
                JSON.stringify(user)
            );
            setUser(user);
            blogService.setToken(user.token);
            // reset to defaults
            setUsername('');
            setPassword('');
            console.log('successful login');
        } catch (exception) {
            setErrorMessage('Wrong credentials');
            setNotificationType('error');
            setTimeout(() => {
                setErrorMessage(null);
                setNotificationType(null);
            }, 5000);
        }
    };

    const handleLogout = async (event) => {
        event.preventDefault();
        console.log('clearing local storage');
        window.localStorage.removeItem('loggedInBlogUser');
        setUser(null);
        isLoggedIn.current = false;
    };

    const loginForm = () => {
        return (
            <form onSubmit={handleLogin}>
                <div>
                    username{' '}
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password{' '}
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        );
    };

    const handlePostForm = async (event) => {
        event.preventDefault();
        const newBlog = {
            title: title,
            author: author,
            url: url,
        };
        const resp = await blogService.createBlog(newBlog);
        console.log(`Post successful: ${JSON.stringify(resp)}`);

        // update state
        setBlogs([...blogs, resp]);
        setTitle('');
        setAuthor('');
        setUrl('');

        // notification msg
        setNotificationType('success');
        setErrorMessage(`${newBlog.title} is added!`);
        setTimeout(() => {
            setErrorMessage(null);
            setNotificationType(null);
        }, 5000);

    };

    const blogForm = () => {
        return (
            <React.Fragment>
                <div>
                    {user.username} logged in
                    <button type="button" onClick={handleLogout}>
                        logout
                    </button>
                </div>
                <BlogsList blogs={blogs} />
                <div>
                    <h2>create new</h2>
                    <form onSubmit={handlePostForm}>
                        title:
                        <input
                            type="text"
                            value={title}
                            name="Title"
                            onChange={({ target }) => setTitle(target.value)}
                        />
                        {`\n`}
                        author:
                        <input
                            type="text"
                            value={author}
                            name="Author"
                            onChange={({ target }) => setAuthor(target.value)}
                        />
                        {`\n`}
                        url:
                        <input
                            type="text"
                            value={url}
                            name="URL"
                            onChange={({ target }) => setUrl(target.value)}
                        />
                        {`\n`}
                        <button type="submit">create</button>
                    </form>
                </div>
            </React.Fragment>
        );
    };

    return (
        <div>
            <h2>blogs</h2>

            <NotificationMessage
                msg={errorMessage}
                notificationType={notificationType}
            />
            {user === null ? loginForm() : blogForm()}
        </div>
    );
};

export default App;
