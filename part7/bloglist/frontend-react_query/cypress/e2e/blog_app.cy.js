describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Oleksandr Tertyshnyk',
      username: 'ole',
      password: 'salainen',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application').should('exist')
    cy.contains('to log').parent().should('have.css', 'display', 'none')
    cy.get('#login-form').parent().should('not.have.css', 'display', 'none')

    cy.contains('login').should('exist')
    cy.contains('password').should('exist')
    cy.contains('username').should('exist')
    cy.contains('cancel').should('exist')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('ole')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Oleksandr Tertyshnyk logged in')

      cy.get('#message')
        .should('contain', 'succesful login as Oleksandr Tertyshnyk')
        .and('have.css', 'color', 'rgb(0, 0, 255)')
        .and('have.css', 'border-style', 'solid')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('ole')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('#message')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.contains('Oleksandr Tertyshnyk logged in').should('not.exist')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'ole', password: 'salainen' })
    })

    it('A blog can be created', function () {
      cy.get('#title').type('Test blog #1')
      cy.get('#author').type('Author 1')
      cy.get('#url').type('http://test.url.qa')
      cy.get('#blog-create-button').click()

      cy.get('#message')
        .should(
          'contain',
          `a new blog '${'Test blog #1'}' by ${'Author 1'} added`
        )
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.contains('Test blog #1').should('exist')
      cy.contains('Author 1').should('exist')
    })

    describe('and 3 blogs are created', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Test blog #1',
          author: 'Author 1',
          url: 'http://test.url.qa1',
        })
        cy.createBlog({
          title: 'Test blog #2',
          author: 'Author 2',
          url: 'http://test.url.qa2',
        })
        cy.createBlog({
          title: 'Test blog #3',
          author: 'Author 1',
          url: 'http://test.url.qa3',
        })
      })

      it('A blog added', function () {
        cy.contains('Test blog #1').should('exist')
        cy.contains('Test blog #2').should('exist')
        cy.contains('Test blog #3').should('exist')
        cy.contains('Author 1').should('exist')
        cy.contains('Author 2').should('exist')
      })

      it('one of blogs can be view', function () {
        cy.contains('Test blog #2').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'hide')

        cy.contains('Test blog #2').parent().parent().as('theBlog')
        cy.get('@theBlog').should('contain', 'http://test.url.qa2')
        cy.get('@theBlog').should('contain', 'Likes: 0')
        cy.get('@theBlog').should('contain', 'Oleksandr Tertyshnyk')
      })

      it('one of blogs can be liked', function () {
        cy.contains('Test blog #3').parent().parent().as('theBlog')
        cy.get('@theBlog').contains('view').click()

        cy.get('@theBlog').contains('like').click()
        cy.wait(4000)
        cy.get('@theBlog').should('contain', 'Likes: 1')

        cy.get('@theBlog').contains('like').click()
        cy.get('#message')
          .should(
            'contain',
            `the blog '${'Test blog #3'}' by ${'Author 1'} is updated`
          )
          .and('have.css', 'color', 'rgb(23, 101, 8)')
          .and('have.css', 'border-style', 'solid')
        cy.wait(4000)
        cy.get('@theBlog').should('contain', 'Likes: 2')
      })

      it('one of blogs can be deleted', function () {
        cy.contains('Test blog #3').parent().parent().as('theBlog')
        cy.get('@theBlog').contains('view').click()
        cy.get('@theBlog').contains('remove').click()

        cy.contains('Test blog #3 by Author 1').should('not.exist')
        cy.get('#message')
          .should(
            'contain',
            `the blog '${'Test blog #3'}' by ${'Author 1'} is removed`
          )
          .and('have.css', 'color', 'rgb(165, 42, 42)')
          .and('have.css', 'border-style', 'solid')
      })

      describe('and 3 blogs are created', function () {
        beforeEach(function () {
          const user = {
            name: 'James Halpert',
            username: 'jimbo',
            password: 'salainen',
          }
          cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
          cy.login({ username: 'jimbo', password: 'salainen' })
          cy.createBlog({
            title: 'Test blog #4',
            author: 'Author 4',
            url: 'http://test.url.qa4',
          })
        })

        it('one of blogs cannot be deleted by other users', function () {
          cy.contains('Test blog #1').parent().parent().as('theBlog')
          cy.get('@theBlog').contains('view').click()
          cy.get('@theBlog').should('contain', 'Oleksandr Tertyshnyk')

          cy.get('@theBlog')
            .get('.blog_btn_remove')
            .should('have.css', 'display', 'none')

          cy.contains('Test blog #4').parent().parent().contains('view').click()
          cy.contains('Test blog #4')
            .parent()
            .parent()
            .contains('remove')
            .should('exist')
        })
      })
    })

    describe('and 4 blogs are created with likes', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Test blog #1',
          author: 'Author 1',
          url: 'http://test.url.qa1',
          likes: 1,
        })
        cy.createBlog({
          title: 'Test blog #4',
          author: 'Author 2',
          url: 'http://test.url.qa4',
          likes: 4,
        })
        cy.createBlog({
          title: 'Test blog #3',
          author: 'Author 1',
          url: 'http://test.url.qa3',
          likes: 3,
        })
        cy.createBlog({
          title: 'Test blog #2',
          author: 'Author 2',
          url: 'http://test.url.qa2',
          likes: 2,
        })
      })

      it('blogs are in order by likes', function () {
        cy.contains('Test blog #1').parent().parent().as('theBlog1')
        cy.contains('Test blog #2').parent().parent().as('theBlog2')
        cy.contains('Test blog #3').parent().parent().as('theBlog3')
        cy.contains('Test blog #4').parent().parent().as('theBlog4')

        cy.get('.blog').eq(0).should('contain', 'Test blog #4')
        cy.get('.blog').eq(1).should('contain', 'Test blog #3')
        cy.get('.blog').eq(2).should('contain', 'Test blog #2')
        cy.get('.blog').eq(3).should('contain', 'Test blog #1')

        cy.get('@theBlog1').contains('view').click()
        cy.get('@theBlog2').contains('view').click()
        cy.get('@theBlog3').contains('view').click()
        cy.get('@theBlog4').contains('view').click()

        cy.get('@theBlog3').should('contain', 'Likes: 3')
        cy.get('@theBlog3').contains('like').click()
        cy.wait(4000)
        cy.get('@theBlog3').should('contain', 'Likes: 4')
        cy.get('@theBlog3').contains('like').click()
        cy.wait(4000)
        cy.get('@theBlog3').should('contain', 'Likes: 5')

        cy.get('.blog').eq(0).should('contain', 'Test blog #3')
        cy.get('.blog').eq(1).should('contain', 'Test blog #4')
        cy.get('.blog').eq(2).should('contain', 'Test blog #2')
        cy.get('.blog').eq(3).should('contain', 'Test blog #1')
      })
    })
  })
})
