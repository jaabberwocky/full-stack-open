import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const getAll = () => {
    const config = {
        headers: { Authorization: token },
    };
    const request = axios.get(baseUrl, config);
    return request.then((response) => response.data);
};

const setToken = (newToken) => {
    token = `bearer ${newToken}`;
};

const createBlog = async (blogPost) => {
    const config = {
        headers: { Authorization: token },
    };
    const request = await axios.post(baseUrl, blogPost, config);
    return request.data;
};

const updateBlog = async (updatedBlog) => {
    const config = {
        headers: { Authorization: token },
    };
    const request = await axios.put(
        baseUrl + '/' + updatedBlog._id,
        updatedBlog,
        config
    );
    return request.data;
};

const deleteBlog = async (deleteId) => {
    // delete usually does not have request body
    // include this in config.data for it to work
    const config = {
        headers: { Authorization: token },
        data: { _id: deleteId },
    };
    const request = await axios.delete(baseUrl, config);
    return request.data;
};

export default { getAll, setToken, createBlog, updateBlog, deleteBlog };
