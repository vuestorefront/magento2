import { 
    M2_CART_ID_COOKIE_NAME,
    M2_CUSTOMER_TOKEN_COOKIE_NAME,
    M2_STORE_COOKIE_NAME 
} from './consts';

const loadState = (app) => {
    let cartId = app.$cookies.get(M2_CART_ID_COOKIE_NAME);
    let customerToken = app.$cookies.get(M2_CUSTOMER_TOKEN_COOKIE_NAME);
    let store = app.$cookies.get(M2_STORE_COOKIE_NAME);

    const getCartId = () => {
        return cartId;
    };

    const setCartId = (id) => {
        if (!id) {
            app.$cookies.remove(M2_CART_ID_COOKIE_NAME);
            return;
        }
        app.$cookies.set(M2_CART_ID_COOKIE_NAME, id);
        cartId = id;
    }

    const getCustomerToken = () => {
        return customerToken;
    }

    const setCustomerToken = (token) => {
        if(!token) {
            app.$cookies.remove(M2_CUSTOMER_TOKEN_COOKIE_NAME);
            return;
        }
        app.$cookies.set(M2_CUSTOMER_TOKEN_COOKIE_NAME, token);
        customerToken = token;
    }

    const getStore = () => {
        //return store;
        return 'ru';
    }

    const setStore = (id) => {
        if (!id) {
            app.$cookies.remove(M2_STORE_COOKIE_NAME);
            return;
        }
        app.$cookies.set(M2_STORE_COOKIE_NAME, id);
        store = id;
    }

    return {
        getCartId,
        setCartId,
        getCustomerToken,
        setCustomerToken,
        getStore,
        setStore
    }
}

export {
    loadState
}