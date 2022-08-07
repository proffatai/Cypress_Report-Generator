/// <refrence types="cypress" />

it('First search', ()=>{
    cy.log('Google first test starts')
    cy.visit('https://www.google.com')
    cy.get('gLFyf').type('cypress {enter}')
    cy.log('Google first test ends')
})

it('Second search', ()=>{
    cy.log('Google second test starts')
    cy.visit('https://www.google.com')
    cy.get('gLFyf').type('cypress {enter}')
    cy.log('Google second test ends')
})