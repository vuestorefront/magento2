import gql from 'graphql-tag';
import CartProductData from './cartProductFragment';

export default gql`
    ${CartProductData}

    fragment CartData on Cart {
        id
        applied_coupons {
            code
        }
        prices {
            subtotal_excluding_tax {
                value
            },
            subtotal_including_tax {
                value
            },
            applied_taxes {
                amount {
                    value
                },
                label
            }
            discounts {
                amount {
                    value
                },
                label
            }
            grand_total {
                value
            }
        }
        items {
            ...CartProductData
        }
        total_quantity
    }`;
