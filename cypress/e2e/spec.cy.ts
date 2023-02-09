describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.get('summary').should('have.length', 3)
    cy.get('[open=""] > summary').should('have.text', 'In Progress')
    cy.get(':nth-child(2) > summary').should('have.text', 'Yet to Start')
    cy.get(':nth-child(3) > summary').should('have.text', 'Completed')
  })
})
