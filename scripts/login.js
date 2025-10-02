function showMessage(elementId, message, isSuccess = false) {
    const el = document.getElementById(elementId);
    el.textContent = message;
    el.style.color = isSuccess ? "green" : "red";
    setTimeout(() => {
        el.textContent = "";
    }, 3000);
}

function validateEmail(email) {
    // Simple email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

// Registration
document.getElementById("register-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("register-email").value.trim();
    const password = document.getElementById("register-password").value.trim();
    const btn = this.querySelector("button[type='submit']");
    btn.disabled = true;

    if (!email || !password) {
        showMessage("register-message", "Please fill in all fields.");
    } else if (!validateEmail(email)) {
        showMessage("register-message", "Invalid email format.");
    } else if (!validatePassword(password)) {
        showMessage("register-message", "Password must be at least 6 characters.");
    } else {
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPassword", password);
        showMessage("register-message", "Registration successful!", true);
        this.reset();
    }
    btn.disabled = false;
});

// Login
document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();
    const btn = this.querySelector("button[type='submit']");
    btn.disabled = true;

    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");

    if (!email || !password) {
        showMessage("login-message", "Please fill in all fields.");
    } else if (email === storedEmail && password === storedPassword) {
        localStorage.setItem("loggedIn", "true");
        showMessage("login-message", "Login successful!", true);
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);
    } else {
        showMessage("login-message", "Invalid login details.");
    }
    btn.disabled = false;
});
