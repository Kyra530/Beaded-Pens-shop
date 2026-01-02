const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

fetch("http://localhost:5000/api/products")
    .then(res => res.json())
    .then(products => {
        let total = 0;

        cart.forEach(item => {
            const product = products.find(p => p.id === item.id);
            const line = product.price * item.qty;
            total += line;

            const div = document.createElement("div");
            div.innerHTML = `
                <p>${product.name} x${item.qty} — $${line.toFixed(2)}</p>
            `;
            cartItems.appendChild(div);
        });

        cartTotal.textContent = total.toFixed(2);
    });
