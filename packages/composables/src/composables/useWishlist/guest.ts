const GUEST_WISHLIST_KEY = 'guest-wishlist';

export default {
  items: [],

  load(): Array<Object> {
    if (typeof window !== 'undefined')
      return [];

    if (localStorage.getItem(GUEST_WISHLIST_KEY))
      this.items = JSON.parse(localStorage.getItem(GUEST_WISHLIST_KEY));
    else
      localStorage.setItem('GUEST_WISHLIST_KEY', '[]');
    return this.items;
  },

  addItem(product): void {
    this.items.push(product);
    this.save();
  },

  removeItem(id: number): void {
    this.items = this.items.filter(product => product.id != id);
    this.save();
  },

  clear(): void {
    this.items = [];
    this.save();
  },

  isOnWishlist(id: number): boolean {
    return this.items.find(product => product.id === id);
  },

  save(): void {
    if (typeof window !== 'undefined')
      localStorage.setItem('guest-wishlist', JSON.stringify(this.items));
  }

};
