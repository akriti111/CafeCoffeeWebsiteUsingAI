// State Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Selectors
const cartCount = document.getElementById('cart-count');
const cartItemsList = document.getElementById('cart-items');
const totalPriceDisplay = document.getElementById('total-price');
const orderForm = document.getElementById('order-form');

// Initialize UI
updateCartUI();

// Add to Cart Logic
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        
        cart.push({ name, price });
        saveAndRefresh();
    });
});

function saveAndRefresh() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() {
    // Update Nav Count
    cartCount.innerText = cart.length;

    // Update Cart Section
    cartItemsList.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} - $${item.price.toFixed(2)}
            <button onclick="removeFromCart(${index})" style="background:none; border:none; color:red; cursor:pointer;">Remove</button>
        `;
        cartItemsList.appendChild(li);
        total += item.price;
    });

    totalPriceDisplay.innerText = total.toFixed(2);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveAndRefresh();
}

// Checkout Logic
orderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Simulate Success
    alert("Success! Your order has been placed. We'll send a confirmation email shortly.");
    
    // Clear Cart
    cart = [];
    saveAndRefresh();
    orderForm.reset();
});