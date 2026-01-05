// --- Product Data (10 Items) ---
const products = [
    // Christmas (4)
    { id: 1, name: "Cozy Christmas Vibes", category: "Christmas", price: 12.99, icon: "fa-tree", image: "https://i.scdn.co/image/ab67616d00001e0201731f466f4c1c6ac912f714" },
    { id: 2, name: "Santa's Sleigh Minimal", category: "Christmas", price: 14.99, icon: "fa-gift", image: "https://thumbs.dreamstime.com/b/merry-christmas-card-design-text-young-deer-looks-up-silhouette-santa-sleigh-reindeer-night-sky-winter-fairy-forest-105237748.jpg" },
    { id: 3, name: "Elegant Red Ornaments", category: "Christmas", price: 12.99, icon: "fa-snowflake" , image: "https://png.pngtree.com/thumb_back/fw800/background/20251124/pngtree-elegant-christmas-red-background-ornament-design-image_20582050.webp"},
    { id: 4, name: "Vintage Noel Poster", category: "Christmas", price: 18.99, icon: "fa-candy-cane", image: "https://t1.pixers.pics/img-c676e9e9/posters-vintage-christmas-poster-with-santa-claus-design.jpg?H4sIAAAAAAAAA42PW26EMAxFtwMSYCcmE8MC5neWgEISprS8lDAt6uobplX_KlX-8EP2ub7wWKIZPFi_7D7APDo3eRjGKXWxDT6Onz7DQimVt2k6ZYiYt-u7DzasW1YKlEWpKC1wcUGdtx8mXc4mvGUv-77FFiBStY1HwqVkI9g5gkShARlUw0zeEg9DPXRbGXezOBNcKeuDsNqWe4Fn_B_LIBBU70R_6dlh3XMnJR4Ky1_CE0uknj8n9I9JjVjo09wexjlLbte0vWev2z2HPzS_a0hXcL2BYpAESoNozlF3vSmWpLRoOul97axreinYOPJsDJKoUWomso6qpPIF5v4i1IoBAAA="},
    // New Year (3)
    { id: 5, name: "Golden New Year Countdown", category: "New Year", price: 19.99, icon: "fa-hourglass-start", image: "https://www.shutterstock.com/image-vector/happy-new-year-2026-golden-260nw-2690076293.jpg"},
    { id: 6, name: "Fireworks Celebration Feed", category: "New Year", price: 15.99, icon: "fa-champagne-glasses", image: "https://img.freepik.com/free-vector/abstract-new-year-party-flyer-template_23-2148360641.jpg?semt=ais_hybrid&w=740&q=80"},
    { id: 7, name: "Minimalist 'Hello 2026'", category: "New Year", price: 10.99, icon: "fa-calendar-check", image: "https://png.pngtree.com/png-vector/20250809/ourlarge/pngtree-hello-2026-png-image_17090806.webp"},
    // Sankranti (3)
    { id: 8, name: "Colorful Kite Festival", category: "Sankranti", price: 14.99, icon: "fa-paper-plane", image: "https://img.freepik.com/free-vector/flat-makar-sankranti-celebration-photocall-template_23-2149951526.jpg?semt=ais_hybrid&w=740&q=80"},
    { id: 9, name: "Pongal", category: "Sankranti", price: 16.99, icon: "fa-jar", image: "https://www.shutterstock.com/image-vector/south-indian-harvesting-festival-happy-260nw-2091131032.jpg"},
    { id: 10, name: "Pongal with harvest Poster", category: "Sankranti", price: 12.99, icon: "fa-sun", image: "https://img.myloview.com/posters/illustration-of-happy-pongal-holiday-harvest-festival-of-tamil-nadu-south-india-greeting-vector-background-700-192679127.jpg"},
    { id: 11, name: "New Year Positivity", category: "New Year", price: 16.99, icon: "fa-jar", image: "https://i.pinimg.com/736x/0f/54/22/0f5422fbaa724b1e2e428a9a1c5cae11.jpg"},
    { id: 12, name: "Sankranti Celebration", category: "Sankranti", price: 12.99, icon: "fa-sun", image: 'https://c8.alamy.com/comp/2E14F4X/indian-festival-happy-makar-sankranti-poster-design-with-group-of-colorful-kites-flying-cloudy-sky-vector-illustration-design-2E14F4X.jpg'} 
];

// --- Functions ---

// 1. Load Products onto products.html
function loadProducts() {
    const container = document.getElementById('product-container');
    // Only run this if we are on the products page
    if (!container) return;

    container.innerHTML = ''; // Clear loading text

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';

        card.innerHTML = `
            <img src="${product.image}" 
                 alt="${product.name}" 
                 class="product-image"
                 onerror="this.style.display='none'">


            <div class="product-info">
                <span class="category-tag">${product.category}</span>
                <h3>${product.name}</h3>
                <span class="price">$${product.price.toFixed(2)}</span>
                <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        container.appendChild(card);
    });
}



// ================= CART LOGIC =================

// Get cart from localStorage
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Add item to cart
function addToCart(productId) {
    const cart = getCart();

    const product = products.find(p => p.id === productId);
    if (!product) return;

    cart.push(product);
    saveCart(cart);
    updateCartBadge();

    alert(`${product.name} added to cart`);
}


// Update cart badge count
function updateCartBadge() {
    const badge = document.getElementById("cart-badge");
    if (!badge) return;

    const cart = getCart();
    badge.textContent = cart.length;
}
function loadCartItems() {
    const container = document.getElementById("cart-items-container");
    const totalEl = document.querySelector(".cart-checkout-container h3");

    if (!container) return;

    const cart = getCart();

    if (cart.length === 0) {
        container.innerHTML = "<p>Your cart is currently empty.</p>";
        totalEl.textContent = "Total: $0.00";
        return;
    }

    let total = 0;
    container.innerHTML = "";

    cart.forEach((item, index) => {
        total += item.price;

        const div = document.createElement("div");
        div.className = "cart-item";

        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>${item.category}</p>
                <span>$${item.price.toFixed(2)}</span>
            </div>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;

        container.appendChild(div);
    });

    totalEl.textContent = `Total: $${total.toFixed(2)}`;
}
function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    loadCartItems();
    updateCartBadge();
}

// Run on every page load
document.addEventListener("DOMContentLoaded", updateCartBadge);


// 3. Contact Form Handling (Connecting to Backend)
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        try {
            // Use the IP address 127.0.0.1 to avoid CORS confusion
            const response = await fetch('http://127.0.0.1:3000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                alert("Saved to MongoDB!Thank you for your feedback.");
                contactForm.reset();
            } else {
                alert("Server said: " + result.message);
            }
        } catch (err) {
            console.error("Fetch error:", err);
            alert("Connection failed. Check if Node.js is running!");
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    loadCartItems();   // REQUIRED
    updateCartBadge();
});

