// scripts/cart.js

function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const container = document.getElementById("cart-items");
    container.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = "<p>Your cart is empty.</p>";
        // Remove checkout button if it exists
        const existingCheckoutBtn = document.getElementById("checkout-btn");
        if (existingCheckoutBtn) existingCheckoutBtn.remove();
    } else {
        cart.forEach((item, index) => {
            const qty = item.qty || 1;
            total += item.price * qty;

            const div = document.createElement("div");
            div.className = "product";
            div.style = `
                display: flex;
                align-items: center;
                justify-content: space-between;
                background: #f9f9f9;
                margin-bottom: 10px;
                padding: 10px 15px;
                border-radius: 8px;
                box-shadow: 0 1px 4px rgba(0,0,0,0.05);
            `;
            div.innerHTML = `
                <div style="flex: 1;">
                    <h3 style="margin:0 0 5px 0;">${item.name}</h3>
                    <p style="margin:0 0 5px 0;">Price: Kshs ${item.price.toFixed(2)} x ${qty}</p>
                    <p style="margin:0; font-size: 0.9em; color: #666;">Subtotal: Kshs ${(item.price * qty).toFixed(2)}</p>
                </div>
                <button 
                    onclick="removeItem(${index})"
                    style="background:#e74c3c;color:#fff;border:none;padding:8px 14px;border-radius:5px;cursor:pointer; margin-left: 10px;"
                >Remove</button>
            `;
            container.appendChild(div);
        });

        // Update total price
        document.getElementById("total").innerText = `Total: Kshs ${total.toFixed(2)}`;

        // Add Checkout button if it doesn't exist
        if (!document.getElementById("checkout-btn")) {
            const checkoutBtn = document.createElement("button");
            checkoutBtn.id = "checkout-btn";
            checkoutBtn.textContent = "Checkout";
            checkoutBtn.style = `
                background: linear-gradient(90deg, #43e97b 0%, #38f9d7 100%);
                color: #222;
                border: none;
                border-radius: 24px;
                padding: 0.7rem 1.8rem;
                font-size: 1rem;
                font-family: 'Montserrat', Arial, sans-serif;
                font-weight: 700;
                cursor: pointer;
                box-shadow: 0 2px 8px rgba(34,34,34,0.08);
                margin-top: 20px;
                width: 100%;
            `;
            checkoutBtn.onclick = checkout;
            container.appendChild(checkoutBtn);
        }
    }
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function checkout() {
    alert("Redirecting to PayPal & M-Pesa payment options!");
    // Add actual payment integration here
}

window.onload = loadCart;