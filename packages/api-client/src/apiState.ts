import {Storage, Store, StoreGroup, Website} from './types';

export class ApiState {

  readonly CART_ID_KEY = 'm2-cart-id';
  readonly CUSTOMER_TOKEN = 'm2-customer-token';
  readonly STORE = 'm2-store';

  private storage: Storage;
  protected websites: Record<string, Website>;
  protected storeGroups: Record<string, StoreGroup>;
  protected stores: Record<string, Store>;

  protected cartId;
  protected customerToken;
  protected storeCode;

  protected defaultStore;

  constructor(storage: Storage, websites: Record<string, Website>, defaultStore: string) {
    this.storage = storage;
    this.cartId = storage.get(this.CART_ID_KEY);
    this.customerToken = storage.get(this.CUSTOMER_TOKEN);
    this.storeCode = storage.get(this.STORE) || defaultStore;

    this.defaultStore = defaultStore;
    this.storeGroups = {};
    this.stores = {};
    for (const websiteCode in websites) {
      const website = websites[websiteCode];
      for (const storeGroupCode in website.storeGroups) {
        const storeGroup = website.storeGroups[storeGroupCode];
        storeGroup.website = website;
        this.storeGroups[storeGroup.code] = storeGroup;
        for (const storeCode in storeGroup.stores) {
          const store = storeGroup.stores[storeCode];
          store.storeGroup = storeGroup;
          this.stores[store.code] = store;
        }
      }
    }
    this.websites = websites;

  }

  getCartId(): string|null {
    return this.cartId;
  }

  setCartId(cartId: string|null): void {
    this.cartId = cartId;
    this.storage.set(this.CART_ID_KEY, cartId);
  }

  getCustomerToken(): string|null {
    return this.customerToken;
  }

  setCustomerToken(customerToken: string|null): void {
    this.customerToken = customerToken;
    this.storage.set(this.CUSTOMER_TOKEN, customerToken);
  }

  getStoreCode(): string {
    return this.storeCode;
  }

  setStoreCode(storeCode: string): void {
    this.storeCode = storeCode;
    this.storage.set(this.STORE, storeCode);
  }

  public getWebsite(websiteCode: string|null): Website {
    if (!websiteCode) {
      websiteCode = this.getCurrentWebsiteCode();
    }

    const website = this.websites[websiteCode] ? this.websites[websiteCode] : null;

    if (!website) {
      throw new Error(`Unknown Website "${websiteCode}" requested`);
    }

    return website;
  }

  public getStoreGroup(storeGroupCode: string|null): StoreGroup {
    if (!storeGroupCode) {
      storeGroupCode = this.getCurrentStoreGroupCode();
    }

    const storeGroup = this.storeGroups[storeGroupCode] ? this.storeGroups[storeGroupCode] : null;

    if (!storeGroup) {
      throw new Error(`Unknown Store Group "${storeGroup}" requested`);
    }

    return storeGroup;
  }

  public getStore(storeCode?: string|null): Store {

    if (!storeCode) {
      storeCode = this.getStoreCode();
    }

    const store = this.stores[storeCode] ? this.stores[storeCode] : null;

    if (!store) {
      throw new Error(`Unknown Store "${storeCode}" requested`);
    }

    return store;
  }

  protected getCurrentWebsiteCode(): string {
    return this.getStore().storeGroup.website.code;
  }

  protected getCurrentStoreGroupCode(): string {
    return this.getStore().storeGroup.code;
  }

}
