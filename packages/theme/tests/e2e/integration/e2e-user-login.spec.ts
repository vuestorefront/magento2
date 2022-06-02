import generator from '../utils/data-generator';
import page from '../pages/factory';
import requests from '../api/requests';
import { Customer } from '../types/customer';

before(() => {
  cy.clearLocalStorage();
  cy.fixture('test-data/e2e-user-login.json').then((fixture) => {
    cy.fixtures = {
      data: fixture,
    };
  });
});

context(['regression'], 'User login', () => {
  it('Should successfully login', () => {
    const data = cy.fixtures.data['Should successfully login'];
    data.customer.email = generator.email;

    requests.createCustomer(data.customer as Customer).then(() => {
      cy.clearCookies();
    });

    page.home.visit();

    page.home.header.openLoginModal();
    page.components.loginModal.loginToAccountButton.click();
    page.components.loginModal.fillForm(data.customer as Customer);
    page.components.loginModal.loginBtn.click();
    page.components.loginModal.container.should('not.exist');
    page.home.header.account.click();
    page.myAccount.sidebar.heading.should('be.visible');
  });

  it('Incorrect credentials - should display an error', () => {
    const data = cy.fixtures.data['Incorrect credentials - should display an error'];
    data.customer.email = generator.email;
    page.home.visit();
    page.home.header.openLoginModal();
    page.components.loginModal.loginToAccountButton.click();
    page.components.loginModal.fillForm(data.customer as Customer);
    page.components.loginModal.loginBtn.click();
    page.components.loginModal.container.contains(data.errorMessage as string).should('be.visible');
  });
});
