import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product.model';

export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    constructor(public shoppingCartItems: {[key: string]: ShoppingCartItem}) {
        this.shoppingCartItems = shoppingCartItems || {};

        for (const itemId in shoppingCartItems) {
            const item = shoppingCartItems[itemId];
            const x = new ShoppingCartItem();
            Object.assign(x, item);
            x.key = itemId;
            this.items.push(x);
        }
    }

    get shoppingCartItemsCount() {
        let count = 0;
        for (const item in this.shoppingCartItems) {
            count += this.shoppingCartItems[item].quantity;
        }
        return count;
    }

    get totalPrice() {
        let sum = 0;
        for (const item in this.items) {
            sum += this.items[item].totalPrice;
        }
        return sum;
    }

    getQuantity(product: any) {
        const item = this.shoppingCartItems[product.key];
        return item ? item.quantity : 0;
      }
}
