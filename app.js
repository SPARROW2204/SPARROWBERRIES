// Product data
const products = [
    { id: 1, name: "Какаоинчик", price: 10 },
    { id: 2, name: "Маска Venom", price: 20 },
    { id: 3, name: "Райан Гослинг", price: 30 },
    { id: 4, name: "Артём", price: 0 }
];

// Cart data
let cart = [];

// Function to display products
function displayProducts() {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $<span id="price-${product.id}">${product.price}</span></p>
            <input type="number" id="input-price-${product.id}" placeholder="New price" min="0">
            <button onclick="updatePrice(${product.id})">Update Price</button>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productContainer.appendChild(productElement);
    });
}

// Function to add a product to the cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCart();
    }
}

// Function to update the price of a product
function updatePrice(productId) {
    const newPriceInput = document.getElementById(`input-price-${productId}`);
    const newPrice = parseFloat(newPriceInput.value);
    if (!isNaN(newPrice) && newPrice >= 0) {
        const product = products.find(p => p.id === productId);
        if (product) {
            product.price = newPrice;
            document.getElementById(`price-${product.id}`).innerText = newPrice.toFixed(2);
            updateCart();
        }
    } else {
        alert("Please enter a valid price.");
    }
}

// Function to display the cart
function updateCart() {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <p>${item.name} - $${item.price}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartContainer.appendChild(cartItem);
    });

    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    const totalElement = document.createElement('p');
    totalElement.innerHTML = `<strong>Total: $${totalPrice}</strong>`;
    cartContainer.appendChild(totalElement);
}

// Function to remove an item from the cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Initialize the page
window.onload = function() {
    displayProducts();
    updateCart();
};
