document.addEventListener("DOMContentLoaded", function() {
    fetch('../data/04_productList.json')
        .then(response => response.json())
        .then(data => populateProductList(data));

    document.getElementById('pricing-form').addEventListener('submit', function(event) {
        event.preventDefault();
        calculateQuote();
    });
});

function populateProductList(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const item = document.createElement('div');
        item.classList.add('product-item');

        item.innerHTML = `
            <label>${product.name} ($${product.price})</label>
            <input type="number" id="${product.sku}" min="0" placeholder="Quantity">
        `;

        productList.appendChild(item);
    });
}

function calculateQuote() {
    let totalPrice = 0;
    const quoteDetails = document.getElementById('quote-details');
    quoteDetails.innerHTML = "<h3>Selected Items:</h3>";

    document.querySelectorAll('.product-item input').forEach(input => {
        if (input.value > 0) {
            const productName = input.previousElementSibling.innerText;
            const productPrice = parseFloat(input.previousElementSibling.innerText.match(/\$([\d\.]+)/)[1]);
            const quantity = parseInt(input.value);

            totalPrice += productPrice * quantity;
            quoteDetails.innerHTML += `<p>${productName} x ${quantity} = $${productPrice * quantity}</p>`;
        }
    });

    quoteDetails.innerHTML += `<h3>Total: $${totalPrice.toFixed(2)}</h3>`;
}
