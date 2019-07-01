import { User } from './user.class';
import { PurchaseRequest } from './purchase-request.class';
import { Product } from './product.class';

export class PurchaseRequestLineItem {
    id: number;
    purchaseRequest: PurchaseRequest;
    product: Product;
    quantity: number;

    constructor(id:number = 0, purchaseRequest: PurchaseRequest = null, product: Product = null,
                quantity:number = 0) {

        this.id = id;
        this.purchaseRequest = purchaseRequest;
        this.product = product;
        this.quantity = quantity;
    }

    about(): string {
        return this.id + " " + this.purchaseRequest + " " + this.product + " " + this.quantity;
    }
}