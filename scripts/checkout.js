// scripts/checkout.js

const loadOrderSummary = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const container = document.getElementById("order-summary");
    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    let total = 0;
    const ul = document.createElement("ul");

    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        ul.appendChild(li);
        total += item.price;
    });

    container.appendChild(ul);

    const totalP = document.createElement("p");
    totalP.textContent = `Total: $${total.toFixed(2)}`;
    container.appendChild(totalP);
};

const handleSubmit = event => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const address = form.address.value.trim();

    if (!name || !email || !phone || !address) {
        alert("Please fill in all required fields.");
        return;
    }

    // In a real app, send this data to backend for processing
    alert(`Order submitted!\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address}`);

    // Clear cart after order
    localStorage.removeItem("cart");
    window.location.href = "index.html";
};

window.onload = () => {
    loadOrderSummary();
    document.getElementById("checkout-form").addEventListener("submit", handleSubmit);
};
