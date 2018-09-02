import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    constructor(public shoppingCartItems: {[key: string]: ShoppingCartItem}) {
        for (const item in shoppingCartItems) {
            this.items.push(shoppingCartItems[item]);
        }
    }

    get shoppingCartItemsCount() {
        let count = 0;
        for (const item in this.shoppingCartItems) {
            count += this.shoppingCartItems[item].quantity;
        }
        return count;
    }
}
