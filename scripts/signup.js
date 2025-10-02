// Functional signup using localStorage with animated messages

function setSignupMessage(message, animate = true) {
    const msgEl = document.getElementById("signup-message");
    if (!msgEl) return;
    msgEl.textContent = message;
    if (animate) {
        msgEl.style.opacity = 0;
        msgEl.style.transition = "opacity 0.5s";
        setTimeout(() => {
            msgEl.style.opacity = 1;
        }, 10);
    }
}

function validateSignupFields(email, password) {
    return email && password;
}

function saveUserToStorage(email, password) {
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);
}

function handleSignupSubmit(e) {
    e.preventDefault();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();

    if (!validateSignupFields(email, password)) {
        setSignupMessage("All fields required.");
        return;
    }

    saveUserToStorage(email, password);
    setSignupMessage("Signup successful!");
    setTimeout(() => {
        window.location.href = "login.html";
    }, 1000);
}

function initSignupForm() {
    const form = document.getElementById("signup-form");
    if (form) {
        form.addEventListener("submit", handleSignupSubmit);
    }
    // Prepare message element for animation
    const msgEl = document.getElementById("signup-message");
    if (msgEl) {
        msgEl.style.opacity = 0;
        msgEl.style.transition = "opacity 0.5s";
    }
}

initSignupForm();
