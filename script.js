
// ==========================================
// HAVEN HOMES - MAIN JAVASCRIPT
// ==========================================

// PRODUCT COLLECTION

const products = [
    {
        id: 1, name: "Classic Linen Shirt", category: "Fashion",
        price: 899, oldPrice: 1299, rating: 4.7,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600",
        description: "A comfortable and timeless linen shirt for everyday style."
    },
    {
        id: 2, name: "Everyday Sneakers", category: "Fashion",
        price: 1499, oldPrice: 1999, rating: 4.5,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
        description: "Versatile sneakers designed for everyday comfort."
    },
    {
        id: 3, name: "Minimal Wrist Watch", category: "Accessories",
        price: 1799, oldPrice: 2499, rating: 4.8,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
        description: "A minimal watch that complements every outfit."
    },
    {
        id: 4, name: "Wireless Headphones", category: "Electronics",
        price: 2199, oldPrice: 2999, rating: 4.6,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
        description: "Enjoy your favourite music with comfortable wireless headphones."
    },
    {
        id: 5, name: "Smart Table Lamp", category: "Home",
        price: 999, oldPrice: 1499, rating: 4.4,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600",
        description: "A stylish lamp to create a warm atmosphere."
    },
    {
        id: 6, name: "Skincare Essentials", category: "Beauty",
        price: 699, oldPrice: 999, rating: 4.5,
        image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600",
        description: "A simple collection of everyday skincare essentials."
    },
    {
        id: 7, name: "Classic Sunglasses", category: "Accessories",
        price: 799, oldPrice: 1199, rating: 4.3,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600",
        description: "Classic sunglasses for a timeless look."
    },
    {
        id: 8, name: "Ceramic Vase", category: "Home",
        price: 599, oldPrice: 899, rating: 4.6,
        image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600",
        description: "A beautiful decorative vase for your living space."
    },
    {
        id: 9, name: "Fitness Yoga Mat", category: "Sports",
        price: 799, oldPrice: 1099, rating: 4.5,
        image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=600",
        description: "A comfortable mat for stretching and yoga."
    },
    {
        id: 10, name: "Daily Journal", category: "Books",
        price: 349, oldPrice: 499, rating: 4.7,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600",
        description: "A lovely journal for thoughts, plans and ideas."
    },
    {
        id: 11, name: "Travel Backpack", category: "Accessories",
        price: 1299, oldPrice: 1799, rating: 4.6,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
        description: "A practical backpack for daily use and travel."
    },
    {
        id: 12, name: "Bluetooth Speaker", category: "Electronics",
        price: 1599, oldPrice: 2199, rating: 4.4,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600",
        description: "A compact speaker for music at home or on the go."
    }
];


// ==========================================
// SAVED DATA
// ==========================================

function loadData(key, fallback) {
    try {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : fallback;
    } catch (error) {
        console.error("Could not load:", key, error);
        return fallback;
    }
}

let profile = loadData("havenProfile", null);
let cart = loadData("havenCart", []);
let wishlist = loadData("havenWishlist", []);
let addresses = loadData("havenAddresses", []);
let orders = loadData("havenOrders", []);
let coins = loadData("havenCoins", 0);
let rewardHistory = loadData("havenRewardHistory", []);

let appliedCoupon = null;
let useCoinsForDelivery = false;
let selectedCategory = "All";

function saveData() {
    localStorage.setItem("havenProfile", JSON.stringify(profile));
    localStorage.setItem("havenCart", JSON.stringify(cart));
    localStorage.setItem("havenWishlist", JSON.stringify(wishlist));
    localStorage.setItem("havenAddresses", JSON.stringify(addresses));
    localStorage.setItem("havenOrders", JSON.stringify(orders));
    localStorage.setItem("havenCoins", JSON.stringify(coins));
    localStorage.setItem("havenRewardHistory", JSON.stringify(rewardHistory));
}


// ==========================================
// CURRENCY FORMAT
// ==========================================

function money(amount) {
    return "₹" + Math.round(amount).toLocaleString("en-IN");
}


// ==========================================
// PROFILE CREATION
// ==========================================

document.getElementById("profile-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("profile-name").value.trim();
    const age = Number(document.getElementById("profile-age").value);
    const gender = document.getElementById("profile-gender").value;
    const language = document.getElementById("profile-language").value;

    if (!name || age < 13 || age > 120 || !gender || !language) {
        alert("Please enter valid profile details.");
        return;
    }

    profile = {
        name: name,
        age: age,
        gender: gender,
        language: language
    };

    saveData();
    enterStore();
});

function enterStore() {
    document.getElementById("profile-screen").classList.add("hidden");
    document.getElementById("store").classList.remove("hidden");

    document.getElementById("welcome-name").textContent =
        "Welcome home, " + profile.name + "!";

    updateHeader();
    showPage("home");
    renderProducts();
}

function updateHeader() {
    document.getElementById("cart-count").textContent =
        cart.reduce((sum, item) => sum + item.quantity, 0);

    const coinDisplay = document.getElementById("home-coins");

    if (coinDisplay) {
        coinDisplay.textContent = coins.toLocaleString("en-IN");
    }
}


// ==========================================
// NAVIGATION
// ==========================================

function showPage(pageName) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.add("hidden");
    });

    const page = document.getElementById(pageName + "-page");

    if (!page) {
        console.warn("Page not found:", pageName);
        return;
    }

    page.classList.remove("hidden");

    if (pageName === "cart") renderCart();
    if (pageName === "wishlist") renderWishlist();
    if (pageName === "profile") renderProfile();
    if (pageName === "addresses") renderAddresses();
    if (pageName === "orders") renderOrders();
    if (pageName === "rewards") renderRewards();

    window.scrollTo({ top: 0, behavior: "smooth" });
}


// ==========================================
// PRODUCT DISPLAY AND SEARCH
// ==========================================

function renderProducts() {
    const grid = document.getElementById("product-grid");

    if (!grid) return;

    const searchElement = document.getElementById("search-input");
    const sortElement = document.getElementById("sort-products");

    const search = searchElement
        ? searchElement.value.trim().toLowerCase()
        : "";

    let filtered = products.filter(product => {
        const categoryMatch =
            selectedCategory === "All" ||
            product.category.toLowerCase() === selectedCategory.toLowerCase();

        const searchableText = (
            product.name + " " +
            product.category + " " +
            product.description
        ).toLowerCase();

        const searchMatch = searchableText.includes(search);

        return categoryMatch && searchMatch;
    });

    const sort = sortElement ? sortElement.value : "default";

    if (sort === "low") {
        filtered.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
        filtered.sort((a, b) => b.price - a.price);
    }

    if (sort === "discount") {
        filtered.sort((a, b) =>
            (b.oldPrice - b.price) / b.oldPrice -
            (a.oldPrice - a.price) / a.oldPrice
        );
    }

    const noProducts = document.getElementById("no-products");

    if (noProducts) {
        noProducts.classList.toggle("hidden", filtered.length !== 0);
    }

    grid.innerHTML = filtered.map(product => {
        const discount = Math.round(
            ((product.oldPrice - product.price) / product.oldPrice) * 100
        );

        const isWishlisted = wishlist.includes(product.id);

        return `
            <article class="product-card">
                <div class="product-image"
                     onclick="openProduct(${product.id})">

                    <img src="${product.image}"
                         alt="${product.name}"
                         loading="lazy">

                    <span class="discount-badge">${discount}% OFF</span>

                    <button class="wishlist-btn"
                        onclick="event.stopPropagation(); toggleWishlist(${product.id})">
                        ${isWishlisted ? "♥" : "♡"}
                    </button>
                </div>

                <div class="product-info">
                    <p class="product-category">${product.category}</p>
                    <h3>${product.name}</h3>
                    <p class="rating">★ ${product.rating} / 5</p>

                    <div class="price">
                        <span class="current-price">${money(product.price)}</span>
                        <span class="old-price">${money(product.oldPrice)}</span>
                        <span class="save-text">${discount}% OFF</span>
                    </div>

                    <button class="add-cart-btn"
                        onclick="addToCart(${product.id})">
                        ADD TO BAG +
                    </button>
                </div>
            </article>
        `;
    }).join("");
}

function filterCategory(category) {
    selectedCategory = category;

    const searchInput = document.getElementById("search-input");

    if (searchInput) {
        searchInput.value = "";
    }

    const title = document.getElementById("products-title");

    if (title) {
        title.textContent =
            category === "All" ? "Discover our products" : category;
    }

    showPage("home");
    renderProducts();

    const section = document.getElementById("products-section");

    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
}

document.getElementById("search-input").addEventListener("input", function() {
    selectedCategory = "All";

    const title = document.getElementById("products-title");

    if (title) {
        title.textContent = this.value.trim()
            ? "Search results"
            : "Discover our products";
    }

    renderProducts();
});

document.getElementById("sort-products").addEventListener("change", renderProducts);


// ==========================================
// PRODUCT DETAILS
// ==========================================

function openProduct(id) {
    const product = products.find(item => item.id === id);

    if (!product) return;

    document.getElementById("product-modal-body").innerHTML = `
        <img class="product-detail-image"
             src="${product.image}" alt="${product.name}">

        <p class="product-category">${product.category}</p>
        <h2>${product.name}</h2>
        <p class="rating">★ ${product.rating} / 5</p>

        <p class="product-detail-price">
            <strong>${money(product.price)}</strong>
            <span class="old-price">${money(product.oldPrice)}</span>
        </p>

        <p class="product-detail-description">
            ${product.description}
        </p>

        <button class="primary-btn"
            onclick="addToCart(${product.id}); closeProduct()">
            ADD TO BAG
        </button>

        <button class="secondary-btn"
            onclick="toggleWishlist(${product.id})">
            ♡ SAVE TO WISHLIST
        </button>
    `;

    document.getElementById("product-modal").classList.remove("hidden");
}

function closeProduct() {
    document.getElementById("product-modal").classList.add("hidden");
}


// ==========================================
// SHOPPING CART
// ==========================================

function addToCart(id) {
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ id: id, quantity: 1 });
    }

    saveData();
    updateHeader();
    alert("Product added to your bag!");
}

function changeQuantity(id, amount) {
    const item = cart.find(item => item.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(item => item.id !== id);
    }

    appliedCoupon = null;

    if (cart.length === 0) {
        useCoinsForDelivery = false;
    }

    saveData();
    updateHeader();
    renderCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    appliedCoupon = null;

    if (cart.length === 0) {
        useCoinsForDelivery = false;
    }

    saveData();
    updateHeader();
    renderCart();
}

function getSubtotal() {
    return cart.reduce((total, item) => {
        const product = products.find(p => p.id === item.id);
        return total + (product ? product.price * item.quantity : 0);
    }, 0);
}

function getShipping(subtotal) {
    if (subtotal === 0 || subtotal >= 999) return 0;
    if (appliedCoupon?.type === "shipping") return 0;
    if (useCoinsForDelivery) return 0;

    return 49;
}

function toggleCoinDelivery() {
    if (useCoinsForDelivery) {
        useCoinsForDelivery = false;
        renderCart();
        return;
    }

    if (coins < 1000) {
        alert("You need 1,000 Haven Coins to unlock free delivery.");
        return;
    }

    if (getSubtotal() >= 999) {
        alert("Your order already qualifies for free delivery!");
        return;
    }

    if (appliedCoupon?.type === "shipping") {
        alert("Free delivery is already unlocked with your coupon.");
        return;
    }

    useCoinsForDelivery = true;
    renderCart();
}

function getCouponDiscount(subtotal) {
    if (!appliedCoupon) return 0;

    if (appliedCoupon.type === "percent") {
        return Math.round(subtotal * appliedCoupon.value / 100);
    }

    return Math.min(appliedCoupon.value, subtotal);
}

function getTotal() {
    const subtotal = getSubtotal();
    const discount = getCouponDiscount(subtotal);

    return Math.max(0, subtotal - discount + getShipping(subtotal));
}

function renderCart() {
    const container = document.getElementById("cart-content");

    if (!container) return;

    if (cart.length === 0) {
        useCoinsForDelivery = false;

        container.innerHTML = `
            <div class="empty-state">
                <h2>Your bag is waiting</h2>
                <p>Discover something lovely to add to it.</p>
                <button class="primary-btn"
                    onclick="showPage('home')">Continue shopping</button>
            </div>
        `;

        return;
    }

    const subtotal = getSubtotal();
    const shipping = getShipping(subtotal);
    const discount = getCouponDiscount(subtotal);

    const itemsHTML = cart.map(item => {
        const product = products.find(p => p.id === item.id);

        if (!product) return "";

        return `
            <div class="cart-item">
                <img src="${product.image}" alt="${product.name}">

                <div>
                    <h3>${product.name}</h3>
                    <p>${money(product.price)} each</p>

                    <div class="quantity-control">
                        <button onclick="changeQuantity(${item.id}, -1)">−</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQuantity(${item.id}, 1)">+</button>
                    </div>

                    <button onclick="removeFromCart(${item.id})">
                        Remove
                    </button>
                </div>

                <strong>${money(product.price * item.quantity)}</strong>
            </div>
        `;
    }).join("");

    container.innerHTML = `
        <div class="cart-layout">
            <div>${itemsHTML}</div>

            <div class="summary-card">
                <h2>Order summary</h2>

                <div class="summary-row">
                    <span>Subtotal</span>
                    <span>${money(subtotal)}</span>
                </div>

                <div class="summary-row">
                    <span>Delivery</span>
                    <span>${shipping === 0 ? "FREE" : money(shipping)}</span>
                </div>

                <div class="coin-delivery-option">
                    <p><strong>✦ ${coins.toLocaleString("en-IN")} Haven Coins</strong></p>

                    <button class="secondary-btn full-btn"
                        onclick="toggleCoinDelivery()"
                        ${coins < 1000 && !useCoinsForDelivery ? "disabled" : ""}>
                        ${useCoinsForDelivery
                            ? "REMOVE COIN REDEMPTION"
                            : "REDEEM 1,000 COINS FOR FREE DELIVERY"}
                    </button>

                    <p class="muted small">
                        ${useCoinsForDelivery
                            ? "Free delivery unlocked using 1,000 coins!"
                            : "Use 1,000 coins to unlock free delivery on this order."}
                    </p>
                </div>

                <div class="coupon-area">
                    <input id="coupon-input"
                        placeholder="ENTER COUPON"
                        aria-label="Coupon code"
                        maxlength="20">

                    <button onclick="applyCoupon()">APPLY</button>
                </div>

                <p id="coupon-message" class="coupon-message"></p>

                <div class="summary-row">
                    <span>Coupon discount</span>
                    <span>−${money(discount)}</span>
                </div>

                <div class="summary-row summary-total">
                    <span>Total amount</span>
                    <span>${money(getTotal())}</span>
                </div>

                <p class="muted small">
                    ${subtotal < 999
                        ? `Add ${money(999 - subtotal)} more for automatic free delivery.`
                        : "You have unlocked free delivery!"}
                </p>

                <button class="primary-btn full-btn"
                    onclick="openCheckout()">
                    PROCEED TO CHECKOUT →
                </button>
            </div>
        </div>
    `;
}


// ==========================================
// COUPONS
// ==========================================

const coupons = {
    WELCOME10: { type: "percent", value: 10, minimum: 0 },
    SAVE20: { type: "percent", value: 20, minimum: 1000 },
    FIRST50: { type: "flat", value: 50, minimum: 500 },
    FREESHIP: { type: "shipping", value: 0, minimum: 0 }
};

function applyCoupon() {
    const input = document.getElementById("coupon-input");
    const message = document.getElementById("coupon-message");

    if (!input || !message) return;

    const code = input.value.trim().toUpperCase();
    const coupon = coupons[code];
    const subtotal = getSubtotal();

    if (!coupon) {
        message.style.color = "#b04d4d";
        message.textContent = "Invalid coupon code. Please try again.";
        return;
    }

    if (subtotal < coupon.minimum) {
        message.style.color = "#b04d4d";
        message.textContent =
            `Add products worth ${money(coupon.minimum - subtotal)} more.`;
        return;
    }

    appliedCoupon = {
        code: code,
        type: coupon.type,
        value: coupon.value
    };

    if (coupon.type === "shipping") {
        useCoinsForDelivery = false;
    }

    renderCart();

    const newMessage = document.getElementById("coupon-message");

    if (newMessage) {
        newMessage.style.color = "#78866c";
        newMessage.textContent =
            code === "FREESHIP"
                ? "FREE DELIVERY unlocked!"
                : `${code} applied successfully!`;
    }
}


// ==========================================
// WISHLIST
// ==========================================

function toggleWishlist(id) {
    if (wishlist.includes(id)) {
        wishlist = wishlist.filter(item => item !== id);
    } else {
        wishlist.push(id);
    }

    saveData();
    renderProducts();

    const wishlistPage = document.getElementById("wishlist-page");

    if (wishlistPage && !wishlistPage.classList.contains("hidden")) {
        renderWishlist();
    }
}

function renderWishlist() {
    const container = document.getElementById("wishlist-content");

    if (!container) return;

    const savedProducts = products.filter(product =>
        wishlist.includes(product.id)
    );

    if (savedProducts.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h2>No saved favourites yet</h2>
                <p>Save products you love and find them here.</p>
                <button class="primary-btn"
                    onclick="filterCategory('All')">Continue shopping</button>
            </div>
        `;
        return;
    }

    container.innerHTML = savedProducts.map(product => `
        <article class="product-card">
            <div class="product-image"
                 onclick="openProduct(${product.id})">
                <img src="${product.image}" alt="${product.name}">
                <button class="wishlist-btn"
                    onclick="event.stopPropagation(); toggleWishlist(${product.id})">
                    ♥
                </button>
            </div>

            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <h3>${product.name}</h3>
                <strong>${money(product.price)}</strong>
                <button class="add-cart-btn"
                    onclick="addToCart(${product.id})">ADD TO BAG +</button>
            </div>
        </article>
    `).join("");
}


// ==========================================
// PROFILE
// ==========================================

function renderProfile() {
    if (!profile) return;

    document.getElementById("profile-display-name").textContent = profile.name;

    document.querySelector(".profile-avatar").textContent =
        profile.name.charAt(0).toUpperCase();

    document.getElementById("profile-information").innerHTML = `
        <div class="info-row"><span>Name</span><strong>${profile.name}</strong></div>
        <div class="info-row"><span>Age</span><strong>${profile.age}</strong></div>
        <div class="info-row"><span>Gender</span><strong>${profile.gender}</strong></div>
        <div class="info-row"><span>Language</span><strong>${profile.language}</strong></div>
        <div class="info-row"><span>Haven coins</span><strong>${coins.toLocaleString("en-IN")}</strong></div>
    `;
}

function editProfile() {
    if (!profile) return;

    const newName = prompt("Enter your name:", profile.name);

    if (newName === null) return;

    const trimmedName = newName.trim();

    if (!trimmedName || trimmedName.length > 40) {
        alert("Please enter a valid name.");
        return;
    }

    profile.name = trimmedName;
    saveData();

    document.getElementById("welcome-name").textContent =
        "Welcome home, " + profile.name + "!";

    renderProfile();
}


// DELETE PROFILE / ACCOUNT

function deleteAccount() {
    const confirmed = confirm(
        "Are you sure you want to delete this account?\n\n" +
        "Your profile, saved addresses, wishlist, cart, orders and Haven Coins " +
        "will be permanently removed from this browser."
    );

    if (!confirmed) return;

    const secondConfirmation = confirm(
        "This action cannot be undone. Delete this account now?"
    );

    if (!secondConfirmation) return;

    const keys = [
        "havenProfile",
        "havenCart",
        "havenWishlist",
        "havenAddresses",
        "havenOrders",
        "havenCoins",
        "havenRewardHistory"
    ];

    keys.forEach(key => localStorage.removeItem(key));

    profile = null;
    cart = [];
    wishlist = [];
    addresses = [];
    orders = [];
    coins = 0;
    rewardHistory = [];

    appliedCoupon = null;
    useCoinsForDelivery = false;
    selectedCategory = "All";

    document.getElementById("store").classList.add("hidden");
    document.getElementById("profile-screen").classList.remove("hidden");

    document.getElementById("profile-form").reset();

    alert("Account deleted. A new user can now create their profile.");
}


// ==========================================
// ADDRESS MANAGEMENT
// ==========================================

document.getElementById("address-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const address = {
        id: Date.now(),
        name: document.getElementById("address-name").value.trim(),
        phone: document.getElementById("address-phone").value.trim(),
        street: document.getElementById("address-street").value.trim(),
        city: document.getElementById("address-city").value.trim(),
        state: document.getElementById("address-state").value.trim(),
        pin: document.getElementById("address-pin").value.trim()
    };

    addresses.push(address);
    saveData();

    this.reset();
    renderAddresses();

    alert("Your address has been saved!");
});

function renderAddresses() {
    const container = document.getElementById("address-list");

    if (!container) return;

    if (addresses.length === 0) {
        container.innerHTML = `
            <div class="empty-state">You haven't saved an address yet.</div>
        `;
        return;
    }

    container.innerHTML = addresses.map(address => `
        <div class="address-card">
            <strong>${address.name}</strong>
            <p>${address.phone}</p>
            <p>${address.street}</p>
            <p>${address.city}, ${address.state} - ${address.pin}</p>
            <button onclick="deleteAddress(${address.id})">Remove address</button>
        </div>
    `).join("");
}

function deleteAddress(id) {
    if (!confirm("Remove this address?")) return;

    addresses = addresses.filter(address => address.id !== id);
    saveData();
    renderAddresses();
}


// ==========================================
// CHECKOUT
// ==========================================

function openCheckout() {
    if (cart.length === 0) {
        alert("Your bag is empty.");
        return;
    }

    if (addresses.length === 0) {
        alert("Please add a delivery address first.");
        showPage("addresses");
        return;
    }

    const summary = document.getElementById("checkout-summary");

    summary.innerHTML = `
        <div class="summary-row">
            <span>Items</span>
            <span>${cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
        </div>
        <div class="summary-row summary-total">
            <span>Payable amount</span>
            <span>${money(getTotal())}</span>
        </div>
        ${useCoinsForDelivery
            ? '<p class="muted small">1,000 Haven Coins will be redeemed for free delivery.</p>'
            : ""}
    `;

    const addressSelect = document.getElementById("checkout-address");

    addressSelect.innerHTML = addresses.map(address => `
        <option value="${address.id}">
            ${address.name} - ${address.city}
        </option>
    `).join("");

    document.getElementById("checkout-modal").classList.remove("hidden");
}

function closeCheckout() {
    document.getElementById("checkout-modal").classList.add("hidden");
}

function placeOrder() {
    const addressId = Number(
        document.getElementById("checkout-address").value
    );

    const address = addresses.find(item => item.id === addressId);

    if (!address) {
        alert("Please select a valid delivery address.");
        return;
    }

    if (useCoinsForDelivery && coins < 1000) {
        alert("You no longer have enough coins for this redemption.");
        useCoinsForDelivery = false;
        closeCheckout();
        renderCart();
        return;
    }

    const orderItems = cart.map(item => {
        const product = products.find(p => p.id === item.id);

        return {
            id: item.id,
            name: product.name,
            price: product.price,
            quantity: item.quantity
        };
    });

    const subtotal = getSubtotal();
    const discount = getCouponDiscount(subtotal);
    const shipping = getShipping(subtotal);
    const total = getTotal();

    const coinsRedeemed = useCoinsForDelivery ? 1000 : 0;
    const earnedCoins = Math.floor(total / 100);

    const order = {
        id: "HH" + Date.now().toString().slice(-8),
        items: orderItems,
        address: address,
        subtotal: subtotal,
        discount: discount,
        shipping: shipping,
        total: total,
        payment: document.getElementById("payment-method").value,
        date: new Date().toLocaleDateString("en-IN"),
        status: "Demo order placed",
        coinsEarned: earnedCoins,
        coinsRedeemed: coinsRedeemed
    };

    orders.unshift(order);

    coins -= coinsRedeemed;
    coins += earnedCoins;

    if (coinsRedeemed > 0) {
        rewardHistory.unshift({
            message: `Redeemed 1,000 coins for free delivery on order ${order.id}`,
            amount: -1000
        });
    }

    if (earnedCoins > 0) {
        rewardHistory.unshift({
            message: `Earned ${earnedCoins} coins from order ${order.id}`,
            amount: earnedCoins
        });
    }

    cart = [];
    appliedCoupon = null;
    useCoinsForDelivery = false;

    saveData();
    updateHeader();
    closeCheckout();

    alert(
        `Your demo order has been placed successfully!\n\n` +
        `Order ID: ${order.id}\n` +
        `Total: ${money(total)}\n` +
        `Coins earned: ${earnedCoins}\n` +
        `Coins redeemed: ${coinsRedeemed}\n` +
        `Current balance: ${coins}`
    );

    showPage("orders");
}


// ==========================================
// ORDER HISTORY
// ==========================================

function renderOrders() {
    const container = document.getElementById("orders-content");

    if (!container) return;

    if (orders.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h2>No orders yet</h2>
                <p>Your shopping journey starts here.</p>
                <button class="primary-btn"
                    onclick="showPage('home')">Start shopping</button>
            </div>
        `;
        return;
    }

    container.innerHTML = orders.map(order => `
        <div class="order-card">
            <p class="order-status">✓ ${order.status}</p>
            <h3>Order #${order.id}</h3>
            <p class="muted">Placed on ${order.date}</p>
            <hr style="border:0;border-top:1px solid #e9e2d8;margin:12px 0">

            ${order.items.map(item => `
                <p>${item.name} × ${item.quantity}</p>
            `).join("")}

            <div class="summary-row">
                <span>Total paid (demo)</span>
                <strong>${money(order.total)}</strong>
            </div>

            <p class="muted small">Payment: ${order.payment}</p>
            <p class="muted small">Coins earned: ${order.coinsEarned || 0}</p>
            <p class="muted small">Coins redeemed: ${order.coinsRedeemed || 0}</p>
        </div>
    `).join("");
}


// ==========================================
// REWARDS
// ==========================================

function renderRewards() {
    document.getElementById("reward-coins").textContent =
        coins.toLocaleString("en-IN");

    const container = document.getElementById("reward-history");

    if (!container) return;

    if (rewardHistory.length === 0) {
        container.innerHTML = `
            <p class="muted">Your rewards history will appear here after your first order.</p>
        `;
        return;
    }

    container.innerHTML = rewardHistory.map(entry => `
        <div class="address-card">
            <p>${entry.message}</p>
            <strong>
                ${entry.amount > 0 ? "+" : ""}${entry.amount} coins
            </strong>
        </div>
    `).join("");
}


// ==========================================
// STARTUP
// ==========================================

if (profile) {
    enterStore();
} else {
    document.getElementById("profile-screen").classList.remove("hidden");
    document.getElementById("store").classList.add("hidden");
}
