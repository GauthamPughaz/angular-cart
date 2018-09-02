import { Product } from './product.model';

export class ShoppingCartItem {
    key: string;
    title: string;
    imageUrl: string;
    price: number;
    quantity: number;

    get totalPrice() {
        return this.price * this.quantity;
    }
}
