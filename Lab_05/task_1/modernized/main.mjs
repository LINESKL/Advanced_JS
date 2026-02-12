import { Product, Cart } from "./core.mjs";
import { formatPrice } from "./utils.mjs";

const cart = new Cart();

const p1 = new Product(1, "Laptop", 999.99);
const p2 = new Product(2, "Smartphone", 499.99);

cart.addItem(p1, 2);
cart.addItem(p2, 3);

console.log(`Subtotal: ${formatPrice(cart.getSubTotal())}`);
console.log(`Tax: ${formatPrice(cart.getTax())}`);
console.log(`Total: ${formatPrice(cart.getTotal())}`);