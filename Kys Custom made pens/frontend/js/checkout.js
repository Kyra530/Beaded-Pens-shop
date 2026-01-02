const checkoutTotal = document.getElementById("checkout-total");
const payBtn = document.getElementById("pay-btn");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

fetch("http://localhost:5000/api/cart/validate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cart })
})
    .then(res => res.json())
    .then(data => {
        checkoutTotal.textContent = data.total.toFixed(2);
    });

payBtn.addEventListener("click", () => {
    fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart })
    })
        .then(res => res.json())
        .then(data => {
            window.location = data.url; // Stripe redirect
        });
});
