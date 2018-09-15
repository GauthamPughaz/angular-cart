import { ShoppingCartItem } from './shopping-cart-item';

export class Order {
    datePlaced: number;
    items: any[];

    constructor(private userId, private shippingInfo, items) {
        this.datePlaced = new Date().getTime();
        this.items = items.map(i => {
            return {
              product: {
                title: i.title,
                imageUrl: i.imageUrl,
                price: i.price
              },
              quantity: i.quantity,
              totalPrice: i.totalPrice
            };
        });
    }
}
