let products = [
    {
        name: 'Tomatoes',
        price: '5',     // dh/kg
        description: 'Fresh, organic tomatoes grown with care in our farm. Perfect for salads, sauces, and more.',
        image: 'images/Tomatoes.png',
        id: 'tomatoes'
    },
    {
        name: 'Apples',
        price: '12',    // dh/kg
        description: 'Crisp and delicious organic apples, picked at peak ripeness for the best flavor.',
        image: 'images/apples.png',
        id: 'apples'
    },
    {
        name: 'Potatoes',
        price: '3', // dh/kg
        description: 'Perfect for every meal, these fresh, hearty potatoes bring natural flavor and quality to your dishes.',
        image: 'images/potatoes.png',
        id: 'potatoes'
    },
];

const productList = document.getElementById('product-list');

products.forEach(product => {
    const productItem = document.createElement('div');
    productItem.classList.add('product-item');

    productItem.innerHTML = `
        <div class="product-content">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-details">
                <h2 class="product-name">${product.name}</h2>
                <p class="product-price">Price: ${product.price} dh/kg</p>
                <p class="product-description">${product.description}</p>
                <div class="product-actions">
                    <label for="quantity-${product.id}" style="color: rgb(0, 0, 0);">Insert Quantity in kg:</label>
                    <input type="number" id="quantity-${product.id}" name="quantity" min="0" value="0" class="quantity-input">
                    <button class="add-to-cart" onclick="saveQuantity('${product.id}')">Add to Cart</button>
                </div>
            </div>
        </div>
    `;

    productList.appendChild(productItem);
});


function handleSupplierClick() {
    window.location.href = 'contact_us.html';
}

function handleClientClick() {
    window.location.href = 'client_home.html';
}

function saveQuantity(product) {
    const quantityInput = document.getElementById(`quantity-${product}`);
    const quantity = quantityInput.value;
    console.log(`Quantity for ${product}: ${quantity} kg`);
    localStorage.setItem(`${product}-quantity`, quantity);
    modal.style.display = "block";
    notificationSound.play();

}


function displayCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ''; // Clear previous items


let total = 0;
    for (const key in localStorage) {
        if (key.endsWith('-quantity')) {
            let product = key.replace('-quantity', '');
            let quantity = localStorage.getItem(key);
            console.log(product);
            let price = 0;
            
            if(product=="potatoes"){
                price = 3;
            }
            if(product=="apples"){
                price = 12;
            }
            if(product=="tomatoes"){
                price = 5;
            }
            // console.log(product);
            if(quantity!=0){
                let cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-details">
                        <h3>${product.charAt(0).toUpperCase() + product.slice(1)}</h3>
                        <p>Quantity: ${quantity} kg --------- Total : ${price*quantity} dh</p>
                    </div>
                `;
                cartItems.appendChild(cartItem);
                total = total + price*quantity;
                console.log(total);
            }
        }
    }
    let totnl = document.createElement('div');

    totnl.innerHTML = `
                    <div class="cart-item-details">
                    <h2>Your Total is : ${total}dh</h2>    
                    
                    </div>
                `;
cartItems.appendChild(totnl);

    
}

var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// the modal functions:
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


