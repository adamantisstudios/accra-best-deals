// Initialize cart from localStorage or create an empty cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Render cart items
function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartSummary = document.getElementById('cartSummary');
    
    if (!cartItems || !emptyCart || !cartSummary) return;
    
    if (cart.length === 0) {
        emptyCart.style.display = 'block';
        cartItems.style.display = 'none';
        cartSummary.style.display = 'none';
        return;
    }
    
    emptyCart.style.display = 'none';
    cartItems.style.display = 'block';
    cartSummary.style.display = 'block';
    
    // Render cart items
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h3 class="cart-item-title">${item.name}</h3>
                <div class="cart-item-price">¢${item.price.toFixed(2)}</div>
                <div class="cart-item-actions">
                    <div class="cart-quantity">
                        <button class="cart-quantity-btn" onclick="updateCartItemQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" value="${item.quantity}" min="1" onchange="updateCartItemQuantity(${item.id}, this.value)">
                        <button class="cart-quantity-btn" onclick="updateCartItemQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <div class="remove-item" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i> Remove
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    // Update cart summary
    updateCartSummary();
}

// Update cart item quantity
function updateCartItemQuantity(productId, newQuantity) {
    newQuantity = parseInt(newQuantity);
    
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }
    
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex !== -1) {
        cart[itemIndex].quantity = newQuantity;
        
        // Save cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart UI
        renderCart();
        updateCartCount();
    }
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart UI
    renderCart();
    updateCartCount();
}

// Update cart summary
function updateCartSummary() {
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    
    if (!subtotalElement || !totalElement) return;
    
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    subtotalElement.textContent = subtotal.toFixed(2);
    totalElement.textContent = subtotal.toFixed(2);
}

// Proceed to checkout
function proceedToCheckout() {
    const modal = document.getElementById('checkoutModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

// Close checkout modal
function closeCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Submit order via WhatsApp
function submitOrder(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const notes = document.getElementById('notes').value;
    
    // Create order message
    let message = `*New Order from Accra Best Deals*\n\n`;
    message += `*Customer Information:*\n`;
    message += `Name: ${name}\n`;
    message += `Phone: ${phone}\n`;
    message += `Email: ${email}\n`;
    message += `Address: ${address}\n`;
    
    if (notes) {
        message += `Notes: ${notes}\n`;
    }
    
    message += `\n*Order Details:*\n`;
    
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        message += `${item.quantity}x ${item.name} - ¢${item.price.toFixed(2)} each = ¢${itemTotal.toFixed(2)}\n`;
    });
    
    message += `\n*Total: ¢${subtotal.toFixed(2)}*\n\n`;
    message += `Please confirm this order. Thank you!`;
    
    // Encode message for WhatsApp
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp with the order details
    window.open(`https://wa.me/233242799990?text=${encodedMessage}`, '_blank');
    
    // Clear cart after order is placed
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Close modal and redirect to home page
    closeCheckoutModal();
    alert('Your order has been sent via WhatsApp. We will contact you shortly to confirm your order.');
    window.location.href = 'index.html';
}

// Function to update the cart count in the header
function updateCartCount() {
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.textContent = totalQuantity;
    }
}

// Initialize cart page
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    updateCartCount();
    
    // Close modal when clicking outside
    window.onclick = function(event) {
        const modal = document.getElementById('checkoutModal');
        if (event.target === modal) {
            closeCheckoutModal();
        }
    };
});