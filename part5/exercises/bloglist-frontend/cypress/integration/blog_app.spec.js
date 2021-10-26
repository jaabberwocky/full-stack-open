/* eslint-disable no-undef */
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
