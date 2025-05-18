// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const menu = document.querySelector('.menu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        menu.classList.toggle('active');
    });
}

// WhatsApp Popup
function showPopup() {
    const popup = document.getElementById('whatsappPopup');
    if (popup) {
        popup.style.display = 'flex';
    }
}

function closePopup() {
    const popup = document.getElementById('whatsappPopup');
    if (popup) {
        popup.style.display = 'none';
    }
}

// Show popup after 5 seconds
setTimeout(showPopup, 5000);

// Hero Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slider .slide');
const prevBtn = document.querySelector('.hero-slider .prev-btn');
const nextBtn = document.querySelector('.hero-slider .next-btn');

function showSlide(index) {
    if (!slides.length) return;
    
    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Show the current slide
    slides[index].classList.add('active');
}

function nextSlide() {
    if (!slides.length) return;
    
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    if (!slides.length) return;
    
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Add event listeners to slider buttons
if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
}

// Auto slide every 5 seconds
setInterval(nextSlide, 5000);

// Special Offers Slider
const offersSlider = document.getElementById('specialOffersSlider');
const prevOfferBtn = document.querySelector('.prev-offer');
const nextOfferBtn = document.querySelector('.next-offer');

function slideOffers(direction) {
    if (!offersSlider) return;
    
    const cardWidth = 320; // Width of offer card + margin
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    offersSlider.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
}

if (prevOfferBtn && nextOfferBtn) {
    prevOfferBtn.addEventListener('click', () => slideOffers('left'));
    nextOfferBtn.addEventListener('click', () => slideOffers('right'));
}

// Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

// Initialize cart count
updateCartCount();

// Fetch products from Netlify CMS
async function fetchProducts() {
    try {
        // In a real implementation, you would fetch from your Netlify CMS
        // For now, we'll use placeholder data
        const response = await fetch('/admin/config.yml');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        
        // This is just a placeholder. In reality, you'd parse the CMS data
        const products = [
            {
                id: 1,
                name: 'Smartphone X Pro',
                description: 'Latest flagship smartphone with advanced features',
                price: 2499.99,
                images: ['images/product1-1.jpg', 'images/product1-2.jpg', 'images/product1-3.jpg'],
                category: 'Smartphones',
                isNewArrival: true,
                isSpecialOffer: false
            },
            {
                id: 2,
                name: 'Ultra HD Smart TV',
                description: '65-inch 4K Smart TV with HDR',
                price: 3999.99,
                images: ['images/product2-1.jpg', 'images/product2-2.jpg', 'images/product2-3.jpg'],
                category: 'TVs',
                isNewArrival: true,
                isSpecialOffer: true
            },
            {
                id: 3,
                name: 'Wireless Headphones',
                description: 'Noise-cancelling wireless headphones',
                price: 899.99,
                images: ['images/product3-1.jpg', 'images/product3-2.jpg', 'images/product3-3.jpg'],
                category: 'Audio',
                isNewArrival: false,
                isSpecialOffer: true
            },
            {
                id: 4,
                name: 'Gaming Laptop',
                description: 'High-performance gaming laptop with RGB keyboard',
                price: 5999.99,
                images: ['images/product4-1.jpg', 'images/product4-2.jpg', 'images/product4-3.jpg'],
                category: 'Laptops',
                isNewArrival: true,
                isSpecialOffer: false
            },
            {
                id: 5,
                name: 'Wireless Earbuds',
                description: 'True wireless earbuds with charging case',
                price: 599.99,
                images: ['images/product5-1.jpg', 'images/product5-2.jpg', 'images/product5-3.jpg'],
                category: 'Audio',
                isNewArrival: false,
                isSpecialOffer: true
            },
            {
                id: 6,
                name: 'Digital Camera',
                description: 'Professional DSLR camera with 4K video',
                price: 3499.99,
                images: ['images/product6-1.jpg', 'images/product6-2.jpg', 'images/product6-3.jpg'],
                category: 'Cameras',
                isNewArrival: true,
                isSpecialOffer: false
            }
        ];
        
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

// Render products on the home page
async function renderProducts() {
    const products = await fetchProducts();
    
    // Render new arrivals
    const newArrivalsGrid = document.getElementById('newArrivalsGrid');
    if (newArrivalsGrid) {
        const newArrivals = products.filter(product => product.isNewArrival);
        newArrivalsGrid.innerHTML = newArrivals.map(product => `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.images[0]}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">¢${product.price.toFixed(2)}</div>
                    <p class="product-description">${product.description}</p>
                    <div class="product-actions">
                        <a href="product.html?id=${product.id}" class="btn view-btn">View</a>
                        <button class="btn add-cart-btn" onclick="addToCart(${product.id})">
                            <i class="fas fa-cart-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Render special offers
    const specialOffersSlider = document.getElementById('specialOffersSlider');
    if (specialOffersSlider) {
        const specialOffers = products.filter(product => product.isSpecialOffer);
        specialOffersSlider.innerHTML = specialOffers.map(product => `
            <div class="product-card offer-card">
                <div class="product-image">
                    <img src="${product.images[0]}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">¢${product.price.toFixed(2)}</div>
                    <p class="product-description">${product.description}</p>
                    <div class="product-actions">
                        <a href="product.html?id=${product.id}" class="btn view-btn">View</a>
                        <button class="btn add-cart-btn" onclick="addToCart(${product.id})">
                            <i class="fas fa-cart-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Render featured products
    const featuredProductsGrid = document.getElementById('featuredProductsGrid');
    if (featuredProductsGrid) {
        featuredProductsGrid.innerHTML = products.slice(0, 8).map(product => `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.images[0]}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">¢${product.price.toFixed(2)}</div>
                    <p class="product-description">${product.description}</p>
                    <div class="product-actions">
                        <a href="product.html?id=${product.id}" class="btn view-btn">View</a>
                        <button class="btn add-cart-btn" onclick="addToCart(${product.id})">
                            <i class="fas fa-cart-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Add to cart function
async function addToCart(productId) {
    const products = await fetchProducts();
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity: 1
        });
    }
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show confirmation message
    alert(`${product.name} added to cart!`);
}

// Initialize products on page load
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});