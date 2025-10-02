// Create or update cart count badge
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let badge = document.getElementById("cart-count");
    if (!badge) {
        badge = document.createElement("span");
        badge.id = "cart-count";
        badge.style.cssText = "background:red;color:white;border-radius:50%;padding:2px 8px;margin-left:8px;font-size:0.9em;vertical-align:top;";
        document.getElementById("cart-icon").appendChild(badge);
    }
    badge.textContent = cart.length;
}

// Show a non-blocking notification
function showNotification(message) {
    let notif = document.createElement("div");
    notif.textContent = message;
    notif.style.cssText = "position:fixed;top:20px;right:20px;background:#333;color:#fff;padding:12px 24px;border-radius:6px;box-shadow:0 2px 8px rgba(0,0,0,0.2);z-index:9999;opacity:0;transition:opacity 0.3s;";
    document.body.appendChild(notif);
    setTimeout(() => notif.style.opacity = 1, 10);
    setTimeout(() => {
        notif.style.opacity = 0;
        setTimeout(() => notif.remove(), 300);
    }, 1500);
}

document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
        const product = {
            name: button.getAttribute("data-product"),
            price: parseFloat(button.getAttribute("data-price")) || 0
        };

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));

        updateCartCount();
        showNotification(`🛒 ${product.name} added to cart!`);
        // Optional: animate button
        button.classList.add("cart-bounce");
        setTimeout(() => button.classList.remove("cart-bounce"), 400);
    });
});

// Initial cart count on page load
updateCartCount();
