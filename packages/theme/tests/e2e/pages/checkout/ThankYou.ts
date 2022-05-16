import { el } from '../utils/element';

export class ThankYou {
  get heading(): Cypress.Chainable {
    return el('thank-you-banner', 'h2');
  }
}
