/* *
* LAB 04.2 APPENDIX : Legacy JavaScript Code for Refactoring Exercise
*
* This file contains legacy code specifically designed for Lab 4.2 refactoring
.
* Students should refactor this code using Module Pattern ( Ch . 7) and
* Namespace Pattern ( Ch . 11) .
*
8 * ANTI - PATTERNS PRESENT :
* 1. Global namespace pollution ( multiple global variables )
* 2. Tightly coupled functions
* 3. Code duplication
* 4. Lack of structure and organization
* 5. No encapsulation
* 6. Direct global variable access
*/
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// E - Commerce Application - Legacy Code with Anti - Patterns
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// Global variables polluting the namespace
var cart = [];
var user = null;
var products = [];
var discount = 0;
var shippingCost = 5;
var taxRate = 0.08;
var currency = " USD ";
var language = " en ";
var theme = " light ";
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// Product Management Functions ( Tightly Coupled )
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
function addProduct(id, name, price, category) {
  var product = {
    id: id,
    name: name,
    price: price,
    category: category,
  };
  products.push(product);
  updateProductDisplay();
  saveProductsToStorage();
}

function removeProduct(id) {
  for (var i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      products.splice(i, 1);
      break;
    }
  }
  updateProductDisplay();
  saveProductsToStorage();
}

function updateProductDisplay() {
  console.log(" Products updated . Total : " + products.length);
  // In a real app , this would update the DOM
}

function saveProductsToStorage() {
  // Directly accessing global products array
  if (typeof localStorage !== " undefined ") {
    localStorage.setItem(" products ", JSON.stringify(products));
  }
}

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// Cart Management Functions ( Tightly Coupled with Product Functions )
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
function addToCart(productId, quantity) {
  var product = null;
  for (var i = 0; i < products.length; i++) {
    if (products[i].id === productId) {
      product = products[i];
      break;
    }
  }
  if (product) {
    var cartItem = {
      id: productId,
      name: product.name,
      price: product.price,
      quantity: quantity,
    };
    cart.push(cartItem);
    updateCartDisplay();
    saveCartToStorage();
    updateTotal();
  }
}
function removeFromCart(productId) {
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id === productId) {
      cart.splice(i, 1);
      break;
    }
  }
  updateCartDisplay();
  saveCartToStorage();
  updateTotal();
}
function updateCartDisplay() {
  console.log(" Cart updated . Items : " + cart.length);
  // In a real app , this would update the DOM
}
function saveCartToStorage() {
  if (typeof localStorage !== " undefined ") {
    localStorage.setItem(" cart ", JSON.stringify(cart));
  }
}
function updateTotal() {
  var subtotal = calculateSubtotal();
  var tax = calculateTax(subtotal);
  var shipping = calculateShipping(subtotal);
  var total = subtotal + tax + shipping - discount;
  console.log(" Subtotal : " + formatPrice(subtotal));
  console.log(" Tax : " + formatPrice(tax));
  console.log(" Shipping : " + formatPrice(shipping));
  console.log(" Discount : " + formatPrice(discount));
  console.log(" Total : " + formatPrice(total));
}
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// Calculation Functions ( Code Duplication )
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
function calculateSubtotal() {
  var total = 0;
  for (var i = 0; i < cart.length; i++) {
    total += cart[i].price * cart[i].quantity;
  }
  return total;
}
function calculateCartTotal() {
  var total = 0;
  for (var i = 0; i < cart.length; i++) {
    total += cart[i].price * cart[i].quantity;
  }
  return total;
}
function getCartSubtotal() {
  var total = 0;
  for (var i = 0; i < cart.length; i++) {
    total += cart[i].price * cart[i].quantity;
  }
  return total;
}
function calculateTax(amount) {
  return amount * taxRate;
}
function computeTax(amount) {
  return amount * taxRate;
}
function calculateShipping(amount) {
  if (amount > 50) {
    return 0;
  } else {
    return shippingCost;
  }
}
function getShippingCost(amount) {
  if (amount > 50) {
    return 0;
  } else {
    return shippingCost;
  }
}
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// Formatting Functions ( Code Duplication )
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
function formatPrice(price) {
  return currency + " " + price.toFixed(2);
}
function formatAmount(amount) {
  return currency + " " + amount.toFixed(2);
}
function formatMoney(money) {
  return currency + " " + money.toFixed(2);
}
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// User Management Functions ( Tightly Coupled )
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
function setUser(name, email, address) {
  user = {
    name: name,
    email: email,
    address: address,
  };
  updateUserDisplay();
  saveUserToStorage();
}
function updateUser(name, email, address) {
  if (name) {
    user.name = name;
  }
  if (email) {
    user.email = email;
  }
  if (address) {
    user.address = address;
  }
  updateUserDisplay();
  saveUserToStorage();
}
function updateUserDisplay() {
  if (user) {
    console.log(" User : " + user.name + " ( " + user.email + " ) ");
  }
}
function saveUserToStorage() {
  if (typeof localStorage !== " undefined " && user) {
    localStorage.setItem(" user ", JSON.stringify(user));
  }
}
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// Configuration Functions ( Scattered Globals )
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
function setDiscount(value) {
  discount = value;
  updateTotal();
}
function setShippingCost(cost) {
  shippingCost = cost;
  updateTotal();
}
function setTaxRate(rate) {
  taxRate = rate;
  updateTotal();
}
function setCurrency(newCurrency) {
  currency = newCurrency;
  updateCartDisplay();
  updateProductDisplay();
}
function setLanguage(newLanguage) {
  language = newLanguage;
  // Would update UI text in real app
}
function setTheme(newTheme) {
  theme = newTheme;
  // Would update CSS in real app
}
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// Utility Functions ( Global Namespace Pollution )
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
function validateEmail(email) {
  if (!email || email.indexOf(" @ ") === -1 || email.indexOf(" . ") === -1) {
    return false;
  }
  return true;
}
function validatePrice(price) {
  if (price === null || price === undefined || price < 0) {
    return false;
  }
  return true;
}
function validateQuantity(quantity) {
  if (quantity === null || quantity === undefined || quantity < 1) {
    return false;
  }
  return true;
}
function getCurrentDate() {
  return new Date().toISOString();
}
function getTimestamp() {
  return new Date().getTime();
}
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// Order Processing Functions ( Tightly Coupled )
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
function processOrder() {
  if (!user) {
    console.log(" User not set ");
    return false;
  }
  if (cart.length === 0) {
    console.log(" Cart is empty ");
    return false;
  }
  var subtotal = calculateSubtotal();
  var tax = calculateTax(subtotal);
  var shipping = calculateShipping(subtotal);
  var total = subtotal + tax + shipping - discount;
  var order = {
    id: generateOrderId(),
    user: user,
    items: cart,
    subtotal: subtotal,
    tax: tax,
    shipping: shipping,
    discount: discount,
    total: total,
    date: getCurrentDate(),
  };
  saveOrderToStorage(order);
  clearCart();
  return order;
}
function generateOrderId() {
  return " ORD - " + Date.now();
}
function saveOrderToStorage(order) {
  var orders = [];
  if (typeof localStorage !== " undefined ") {
    var stored = localStorage.getItem(" orders ");
    if (stored) {
      orders = JSON.parse(stored);
    }
    orders.push(order);
    localStorage.setItem(" orders ", JSON.stringify(orders));
  }
}
function clearCart() {
  cart = [];
  updateCartDisplay();
  saveCartToStorage();
  updateTotal();
}
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// Initialization Function
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
function initializeApp() {
  // Load data from storage
  if (typeof localStorage !== " undefined ") {
    var storedProducts = localStorage.getItem(" products ");
    if (storedProducts) {
      products = JSON.parse(storedProducts);
    }
    var storedCart = localStorage.getItem(" cart ");
    if (storedCart) {
      cart = JSON.parse(storedCart);
    }
    var storedUser = localStorage.getItem(" user ");
    if (storedUser) {
      user = JSON.parse(storedUser);
    }
  }
  updateProductDisplay();
  updateCartDisplay();
  updateUserDisplay();
  updateTotal();
}

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// Example Usage ( for testing )
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// Uncomment to test
/*
initializeApp () ;
addProduct (1 , " Laptop " , 999.99 , " Electronics ") ;
addProduct (2 , " Mouse " , 29.99 , " Electronics ") ;
addProduct (3 , " Keyboard " , 79.99 , " Electronics ") ;
setUser (" John Doe " , " john@example . com " , "123 Main St ") ;
addToCart (1 , 1) ;
addToCart (2 , 2) ;
addToCart (3 , 1) ;
setDiscount (50) ;

var order = processOrder () ;
console . log (" Order processed :" , order ) ;
*/
