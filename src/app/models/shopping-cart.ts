import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product.model';

export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    constructor(private shoppingCartItems: {[key: string]: ShoppingCartItem}) {
        this.shoppingCartItems = shoppingCartItems || {};

        for (const itemId in shoppingCartItems) {
            const item = shoppingCartItems[itemId];
            this.items.push(new ShoppingCartItem({...item, key: itemId}));
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
