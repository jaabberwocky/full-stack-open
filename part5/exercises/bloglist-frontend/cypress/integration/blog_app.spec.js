/* eslint-disable no-undef */
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

describe('Blog app', function () {
    it('front page can be opened', function () {
        cy.visit('http://localhost:3000');
        cy.contains('blogs');
    });

    it('able to login', function () {
        cy.visit('http://localhost:3000');
        cy.get('input:first').type('toby');
        cy.get('input:last').type('toby').type('{enter}');
        //cy.contains('login').click();
        cy.contains('logout');
    });
});

describe('Logging in/Logging Out', function () {
    beforeEach(function () {
        const newUser = {
            username: 'test-user2',
            password: 'test-user2',
            name: 'test-user2',
        };
        cy.request({
            method: 'POST',
            url: 'http://localhost:3003/api/users',
            body: newUser,
            failOnStatusCode: false,
        });
        cy.visit('http://localhost:3000');
    });

    it('Login', function () {
        cy.get('input:first').type('test-user2');
        cy.get('input:last').type('test-user2').type('{enter}');
        cy.contains('logout');
    });

    it('Does not login if wrong', function () {
        cy.get('input:first').type('test-user');
        cy.get('input:last').type('test-user2').type('{enter}');
        cy.contains('Wrong credentials');
    });

    it('Able to create new blog if logged in', function () {
        const rand = getRandomIntInclusive(0, 10000);
        cy.get('input:first').type('test-user2');
        cy.get('input:last').type('test-user2').type('{enter}');
        cy.contains('show form').click();

        cy.get('input[name="Title"]').type(`helloworld-test${rand}`);
        cy.get('input[name="Author"]').type('helloworld-author');
        cy.get('input[name="URL"]').type('helloworld.com');
        cy.get('button').contains('create').click();

        cy.contains(`helloworld-test${rand}`);
    });
});
