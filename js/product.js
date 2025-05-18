// Get product ID from URL
function getProductId() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id'));
}

// Mock fetchProducts function (replace with your actual implementation)
async function fetchProducts() {
    // Replace this with your actual data fetching logic
    return [
        {
            id: 1,
            name: "Product 1",
            price: 19.99,
            description: "This is product 1",
            category: "Electronics",
            images: ["image1.jpg", "image2.jpg"]
        },
        {
            id: 2,
            name: "Product 2",
            price: 29.99,
            description: "This is product 2",
            category: "Clothing",
            images: ["image3.jpg", "image4.jpg"]
        },
        {
            id: 3,
            name: "Product 3",
            price: 39.99,
            description: "This is product 3",
            category: "Electronics",
            images: ["image5.jpg", "image6.jpg"]
        },
        {
            id: 4,
            name: "Product 4",
            price: 49.99,
            description: "This is product 4",
            category: "Home & Garden",
            images: ["image7.jpg", "image8.jpg"]
        }
    ];
}

// Fetch single product
async function fetchProduct(productId) {
    const products = await fetchProducts();
    return products.find(product => product.id === productId);
}

// Initialize cart from localStorage or create an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update cart count (replace with your actual implementation)
function updateCartCount() {
    // Replace this with your actual cart count update logic
    console.log("Cart count updated!");
}

// Render product details
async function renderProductDetails() {
    const productId = getProductId();
    if (!productId) {
        window.location.href = 'index.html';
        return;
    }
    
    const product = await fetchProduct(productId);
    if (!product) {
        window.location.href = 'index.html';
        return;
    }
    
    // Update page title
    document.title = `${product.name} - Accra Best Deals`;
    
    // Update breadcrumb
    const productNameElement = document.getElementById('productName');
    if (productNameElement) {
        productNameElement.textContent = product.name;
    }
    
    // Update main image
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.src = product.images[0];
        mainImage.alt = product.name;
    }
    
    // Update thumbnails
    const thumbnailContainer = document.getElementById('thumbnailContainer');
    if (thumbnailContainer) {
        thumbnailContainer.innerHTML = product.images.map((image, index) => `
            <div class="thumbnail ${index === 0 ? 'active' : ''}" onclick="changeMainImage('${image}', this)">
                <img src="${image}" alt="${product.name} - Image ${index + 1}">
            </div>
        `).join('');
    }
    
    // Update product info
    const productTitle = document.getElementById('productTitle');
    if (productTitle) {
        productTitle.textContent = product.name;
    }
    
    const productPrice = document.getElementById('productPrice');
    if (productPrice) {
        productPrice.textContent = `¢${product.price.toFixed(2)}`;
    }
    
    const productDescription = document.getElementById('productDescription');
    if (productDescription) {
        productDescription.textContent = product.description;
    }
    
    const productCategory = document.getElementById('productCategory');
    if (productCategory) {
        productCategory.textContent = product.category;
    }
    
    const productFullDescription = document.getElementById('productFullDescription');
    if (productFullDescription) {
        productFullDescription.innerHTML = `
            <p>${product.description}</p>
            <p>Experience the best quality electronics with Accra Best Deals. This ${product.name} comes with a warranty and after-sales support.</p>
            <p>For any inquiries about this product, please contact us via WhatsApp at +233 242799990.</p>
        `;
    }
    
    const productSpecifications = document.getElementById('productSpecifications');
    if (productSpecifications) {
        // These are placeholder specs - in a real implementation, these would come from the CMS
        productSpecifications.innerHTML = `
            <tr>
                <th>Brand</th>
                <td>Premium Brand</td>
            </tr>
            <tr>
                <th>Model</th>
                <td>${product.name}</td>
            </tr>
            <tr>
                <th>Warranty</th>
                <td>1 Year</td>
            </tr>
            <tr>
                <th>Condition</th>
                <td>New</td>
            </tr>
            <tr>
                <th>In Stock</th>
                <td>Yes</td>
            </tr>
        `;
    }
    
    // Setup fullscreen slider
    const fullscreenSlider = document.getElementById('fullscreenSlider');
    if (fullscreenSlider) {
        fullscreenSlider.innerHTML = product.images.map((image, index) => `
            <div class="fullscreen-slide ${index === 0 ? 'active' : ''}">
                <img src="${image}" alt="${product.name} - Image ${index + 1}">
            </div>
        `).join('');
    }
    
    // Render related products
    renderRelatedProducts(product.category, product.id);
}

// Change main image when thumbnail is clicked
function changeMainImage(imageSrc, thumbnailElement) {
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.src = imageSrc;
    }
    
    // Update active thumbnail
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumbnail => {
        thumbnail.classList.remove('active');
    });
    
    thumbnailElement.classList.add('active');
}

// Open fullscreen image modal
function openFullscreen() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

// Close fullscreen image modal
function closeFullscreen() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Navigate fullscreen slides
let currentFullscreenSlide = 0;
const fullscreenSlides = document.querySelectorAll('.fullscreen-slide');

function showFullscreenSlide(index) {
    if (!fullscreenSlides.length) return;
    
    fullscreenSlides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    fullscreenSlides[index].classList.add('active');
}

function nextSlide() {
    if (!fullscreenSlides.length) return;
    
    currentFullscreenSlide = (currentFullscreenSlide + 1) % fullscreenSlides.length;
    showFullscreenSlide(currentFullscreenSlide);
}

function prevSlide() {
    if (!fullscreenSlides.length) return;
    
    currentFullscreenSlide = (currentFullscreenSlide - 1 + fullscreenSlides.length) % fullscreenSlides.length;
    showFullscreenSlide(currentFullscreenSlide);
}

// Quantity selector
function increaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
        quantityInput.value = parseInt(quantityInput.value) + 1;
    }
}

function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput && parseInt(quantityInput.value) > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
    }
}

// Add to cart from product page
async function addToCart() {
    const productId = getProductId();
    const product = await fetchProduct(productId);
    const quantity = parseInt(document.getElementById('quantity').value);
    
    if (!product) return;
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity: quantity
        });
    }
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show confirmation message
    alert(`${quantity} ${product.name} added to cart!`);
}

// Inquire via WhatsApp
async function inquireViaWhatsApp() {
    const productId = getProductId();
    const product = await fetchProduct(productId);
    
    if (!product) return;
    
    const message = `Hello, I'm interested in the ${product.name} priced at ¢${product.price.toFixed(2)}. Can you provide more information?`;
    const encodedMessage = encodeURIComponent(message);
    
    window.open(`https://wa.me/233242799990?text=${encodedMessage}`, '_blank');
}

// Render related products
async function renderRelatedProducts(category, currentProductId) {
    const products = await fetchProducts();
    const relatedProducts = products
        .filter(product => product.category === category && product.id !== currentProductId)
        .slice(0, 4);
    
    const relatedProductsGrid = document.getElementById('relatedProductsGrid');
    if (relatedProductsGrid) {
        relatedProductsGrid.innerHTML = relatedProducts.map(product => `
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

// Initialize product details on page load
document.addEventListener('DOMContentLoaded', () => {
    renderProductDetails();
    
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to current button and pane
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
});