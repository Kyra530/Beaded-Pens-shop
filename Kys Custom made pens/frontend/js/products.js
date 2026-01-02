const productList = document.getElementById("product-list");

fetch("http://localhost:5000/api/products")
    .then(res => res.json())
    .then(products => {
        products.forEach(p => {
            const card = document.createElement("div");
            card.className = "product-card";

            card.innerHTML = `
                <div class="img-placeholder">Image</div>
                <h3>${p.name}</h3>
                <p>${p.description}</p>
                <p>$${p.price.toFixed(2)}</p>
                <a href="product.html?id=${p.id}" class="btn">View</a>
            `;

            productList.appendChild(card);
        });
    });
