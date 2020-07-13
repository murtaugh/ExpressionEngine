/// <reference types="Cypress" />

import SystemTemplates from '../../elements/pages/design/SystemTemplates';
const page = new SystemTemplates;
const { _, $ } = Cypress

context('System Templates', () => {

    before(function() {
        cy.task('db:seed')
        cy.uninstallTheme('member')
        cy.uninstallTheme('forum')
    })

    beforeEach(function() {
        cy.authVisit(page.url);
    })

    describe('Messages', function() {
        beforeEach(function() {
            cy.visit('admin.php?/cp/design/system')
        })

        it('displays', function() {
            page.get('templates').its('length').should('eq', 2)
            page.get('templates').eq(0).find('td:first-child').contains('Site Offline')
            page.get('templates').eq(1).find('td:first-child').contains('User Messages')
        })

        
    })

    describe('Email', function() {
        beforeEach(function() {
            cy.visit('admin.php?/cp/design/email')
        })

        it('displays', function() {
            page.get('templates').its('length').should('eq', 15)
        })

       
    })

    describe('Members without Templates', function() {
        beforeEach(function() {
            cy.visit('admin.php?/cp/design/members')
        })

        it('displays a helpful error when user templates are missing', function() {
            page.get('theme_chooser').should('not.exist')
            page.get('templates').its('length').should('eq', 1)
            page.get('templates').eq(0).find('td:first-child').contains('No Templates found. See documentation.')
        })
    })

    describe('Members with Templates', function() {
        before(function() {
            cy.installTheme('member')
        })

        beforeEach(function() {
            cy.visit('admin.php?/cp/design/members')
        })

        it('displays when user templates are present', function() {
            page.get('theme_chooser').should('exist')
            page.get('templates').its('length').should('eq', 86)
        })

        
    })

    describe('Members with Templates in themes/users', function() {
        before(function() {
            cy.installTheme('member', true)
        })

        beforeEach(function() {
            cy.visit('admin.php?/cp/design/members')
        })

        it('displays when user templates are present', function() {
            page.get('theme_chooser').should('exist')
            page.get('templates').its('length').should('eq', 86)
        })

       
    })

    describe('Forums', function() {
        before(function() {
            cy.authVisit('/admin.php?/cp/addons')
            cy.get('a[data-post-url*="cp/addons/install/forum"]').click()
        })

        context('Forums without Templates', function() {
            it('displays a helpful error when user templates are missing', function() {
                cy.visit('admin.php?/cp/design/forums')

                page.get('theme_chooser').should('not.exist')
                page.get('templates').its('length').should('eq', 1)
                page.get('templates').eq(0).find('td:first-child').contains('No Templates found. See documentation.')
            })
        })

        context('Forums with Templates', function() {
            before(function() {
                cy.installTheme('forum')
            })

            beforeEach(function() {
                cy.visit('admin.php?/cp/design/forums')
            })

            it('displays when user templates are present', function() {
                page.get('theme_chooser').should('exist')
                page.get('templates').its('length').should('eq', 201)
            })

           
        })

        context('Forums with Templates in themes/users', function() {
            before(function() {
                cy.installTheme('forum', true)
            })

            beforeEach(function() {
                cy.visit('admin.php?/cp/design/forums')
            })

            it('displays when user templates are present', function() {
                page.get('theme_chooser').should('exist')
                page.get('templates').its('length').should('eq', 201)
            })

            it('displays the edit form', function() {
                page.get('templates').eq(1).click()
                page.get('form.template_contents').should('not.have.value', '')
            })
        })
    })

})