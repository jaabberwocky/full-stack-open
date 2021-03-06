import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import { Flex } from './components/Flex';
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

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [notificationType, setNotificationType] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    useEffect(() => {
        if (loggedIn) {
            blogService.getAll().then((blogs) => {
                blogs.sort((a, b) => parseInt(a.likes) - parseInt(b.likes));
                setBlogs(blogs);
            });
            console.log('pulling data');
        } else {
            console.log('not pulling data as not logged in');
        }
    }, [loggedIn]);

    useEffect(() => {
        // only runs on first render
        // due to empty array
        const loggedInBlogUser =
            window.localStorage.getItem('loggedInBlogUser');
        if (loggedInBlogUser) {
            const user = JSON.parse(loggedInBlogUser);
            setLoggedIn(true);
            blogService.setToken(user.token);
            setUser(user);
        }
    }, []);

    const BlogsList = ({ blogs }) => {
        return (
            <div>
                {blogs.map((blog) => (
                    <Blog
                        blog={blog}
                        key={blog._id}
                        blogs={blogs}
                        setBlogs={setBlogs}
                    />
                ))}
            </div>
        );
    };

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
            setLoggedIn(true);
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
        setLoggedIn(false);
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

    const blogForm = () => {
        return (
            <Flex display="flex" justifyContent="center" flexDirection="column">
                <Container fluid>
                    <Row>
                        <Col xs={4}>{user.username} logged in</Col>
                        <Col>
                            <button type="button" onClick={handleLogout}>
                                logout
                            </button>
                        </Col>
                    </Row>
                    <Flex
                        display="flex"
                        justifyContent="center"
                        flexDirection="column"
                    >
                        <BlogsList blogs={blogs} />
                    </Flex>
                    <Row>
                        <h2>create new</h2>{' '}
                    </Row>
                    <Row>
                        <BlogForm
                            title={title}
                            setTitle={setTitle}
                            handlePostForm={handlePostForm}
                            url={url}
                            setUrl={setUrl}
                            author={author}
                            setAuthor={setAuthor}
                        />
                    </Row>
                </Container>
            </Flex>
        );
    };

    return (
        <Container fluid>
            <h2>blogs</h2>

            <NotificationMessage
                msg={errorMessage}
                notificationType={notificationType}
            />
            {user === null ? loginForm() : blogForm()}
        </Container>
    );
};

export default App;
