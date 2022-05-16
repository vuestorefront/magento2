import { el } from '../utils/element';

export class Billing {
  get continueToPaymentButton(): Cypress.Chainable {
    return el('continue-to-payment');
  }

  get heading(): Cypress.Chainable {
    return el('heading-billing');
  }

  get copyAddressLabel(): Cypress.Chainable {
    return el('copy-address', 'label');
  }
}
