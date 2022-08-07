/// <refrence types="cypress" />

it('My 1st test', ()=>{
    cy.log('Login first test starts')
    cy.visit('https://trytestingthis.netlify.app/')
    cy.get('#uname').type('test') 
    cy.get('#pwd').type('test') 
    cy.get('[type="submit"]').click() 
    cy.log('Login first test ends')
})