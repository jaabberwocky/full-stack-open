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
    const request = await axios.put(baseUrl + '/' + updatedBlog._id, updatedBlog, config);
    return request.data;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, createBlog, updateBlog };
