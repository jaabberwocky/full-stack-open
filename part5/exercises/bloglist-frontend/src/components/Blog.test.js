import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import Blog from './Blog';

test('renders content', () => {
    const blogs = [
        {
            title: 'hello1',
            author: 'hello1-author',
            likes: '0',
            url: 'hello1.com',
        },
        {
            title: 'hello2',
            author: 'hello2-author',
            likes: '0',
            url: 'hello2.com',
        },
    ];
    const setBlogs = () => {};

    const component = render(
        <Blog blog={blogs[0]} blogs={blogs} setBlogs={setBlogs} />
    );

    expect(component.container).toHaveTextContent('hello1');
});

test('clicking button calls toggle function', () => {
    const blogs = [
        {
            title: 'hello1',
            author: 'hello1-author',
            likes: '0',
            url: 'hello1.com',
        },
        {
            title: 'hello2',
            author: 'hello2-author',
            likes: '0',
            url: 'hello2.com',
        },
    ];
    const setBlogs = () => {};

    const component = render(
        <Blog blog={blogs[0]} blogs={blogs} setBlogs={setBlogs} />
    );

    const button = component.getByText('view');
    fireEvent.click(button);
    expect(component.container).toHaveTextContent('hello1-author');
});
