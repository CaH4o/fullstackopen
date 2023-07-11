describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    //cy.visit('http://localhost:3000')
    cy.visit('')
  })

  it('front page can be opened', function () {
    cy.contains('Notes')
    cy.contains(
      'Note app, Department of Computer Science, University of Helsinki 2023'
    )
  })

  //it.only()
  it('user can login', function () {
    cy.contains('log in').click()
    //cy.get('input:first').type('mluukkai')
    //cy.get('input:last').type('salainen')
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()

    cy.contains('Matti Luukkainen logged in')
  })

  it('login fails with wrong password', function () {
    cy.contains('log in').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    //1
    //cy.contains('Wrong credentials')

    //2
    //cy.get('.error').contains('Wrong credentials')

    //3
    //cy.get('.error').should('contain', 'Wrong credentials')
    //cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    //cy.get('.error').should('have.css', 'border-style', 'solid')

    //4
    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    //1
    //cy.get('html').should('not.contain', 'Matti Luukkainen logged in')

    //2
    cy.contains('Matti Luukkainen logged in').should('not.exist')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      //1
      /* cy.contains('log in').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click() */

      //2
      /* cy.request('POST', 'http://localhost:3001/api/login', {
        username: 'mluukkai',
        password: 'salainen',
      }).then((response) => {
        localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      }) */

      //3
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('a new note can be created', function () {
      cy.contains('new note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    describe(/* 'and a note exists' */ 'and several notes exist', function () {
      beforeEach(function () {
        //1
        /* cy.contains('new note').click()
        cy.get('input').type('another note cypress')
        cy.contains('save').click() */

        //2
        /* cy.createNote({
          content: 'another note cypress',
          important: true
        }) */

        //3
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })

      /* it('it can be made not important', function () {
        cy.contains('another note cypress')
          .contains('make not important')
          .click()

        cy.contains('another note cypress').contains('make important')
      }) */

      it('one of those can be made important', function () {
        //1
        //cy.contains('second note').contains('make important').click()
        //cy.contains('second note').contains('make not important')

        //2
        //cy.contains('second note').parent().find('button').click()
        //cy.contains('second note')
        //  .parent()
        //  .find('button')
        //  .should('contain', 'make not important')

        //3
        cy.contains('second note').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'make not important')
      })

      it('then example', function () {
        cy.get('button').then((buttons) => {
          console.log('number of buttons', buttons.length)
          cy.wrap(buttons[0]).click()
        })
      })
    })
  })
})
