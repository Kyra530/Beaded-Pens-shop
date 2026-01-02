const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const container = document.getElementById("product-details");

fetch(`http://localhost:5000/api/products/${id}`)
    .then(res => res.json())
    .then(p => {
        container.innerHTML = `
            <div class="img-placeholder">Image</div>
            <h2>${p.name}</h2>
            <p>${p.details}</p>
            <p><strong>$${p.price.toFixed(2)}</strong></p>
            <button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
        `;
    });

function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(i => i.id === id);

    if (existing) existing.qty++;
    else cart.push({ id, qty: 1 });

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
}
