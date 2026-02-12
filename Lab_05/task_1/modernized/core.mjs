import { taxRate } from "./config.mjs";

export class Product {
    #id;
    #name;
    #price;

    constructor(id, name, price) {
        this.#id = id;
        this.#name = name;
        this.#price = price;
    }

    get price() {
        return this.#price
    }

    get name() {
        return this.#name;
    }
}

export class Cart {
    #items = [];

    addItem(product, quantity) {
        this.#items.push({ product, quantity });
    }

    getSubTotal() {
        let total = 0;
        for (const item of this.#items) {
            total += item.product.price * item.quantity;
        }
        return total;
    }

    getTax() {
        return this.getSubTotal() * taxRate;
    }

    getTotal() {
        return this.getSubTotal() + this.getTax();
    }
}