import { Customer } from '../types/customer';

const requests = {
  createCustomer(customer: Customer): Cypress.Chainable {
    const options = {
      url: '/api/magento/createCustomer',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: [
        {
          email: customer.email,
          password: customer.password,
          firstname: customer.firstName,
          lastname: customer.lastName,
        },
      ],
    };
    return cy.request(options);
  },
};

export default requests;
