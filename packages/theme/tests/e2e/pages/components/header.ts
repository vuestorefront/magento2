// @ts-nocheck
import { el } from '../utils/element';

class Header {
  get account(): Cypress.Chainable {
    return el('app-header-account');
  }

  get cart(): Cypress.Chainable {
    return el('app-header-cart');
  }

  get categories(): Cypress.Chainable {
    return cy.get('[data-e2e*="app-header"]');
  }

  get category() {
    return {
      women: () => el('app-header-url_women'),
      men: () => el('app-header-url_men'),
    };
  }

  openCart(): Cypress.Chainable {
    const click = ($el) => $el.click();
    return this.cart.pipe(click).should(() => {
      // eslint-disable-next-line jest/no-standalone-expect,no-unused-expressions,@typescript-eslint/no-unused-expressions,jest/valid-expect
      expect(Cypress.$('[data-e2e="sidebar-cart"]')).to.exist;
    });
  }

  openLoginModal(): Cypress.Chainable {
    const click = ($el) => $el.click();
    return this.account.pipe(click).should(() => {
      // eslint-disable-next-line jest/no-standalone-expect,no-unused-expressions,@typescript-eslint/no-unused-expressions,jest/valid-expect
      expect(Cypress.$('[data-e2e="login-modal"]')).to.exist;
    });
  }
}

export default new Header();
