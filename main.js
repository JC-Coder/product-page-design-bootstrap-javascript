const productName = document.querySelector('.product-title').innerText;
const productPrice = document.querySelector('.product-price .price').textContent.slice(1, -1);
const incBtn = document.querySelector('.fa-plus');
const decBtn = document.querySelector('.fa-minus');
const productQuanHtml = document.querySelector('.product-quantity .product-q');
const productImage = document.querySelector('.product-image img').src;
const addCartBtn = document.querySelector('.add-cart button');
const cartCount = document.querySelector('.cart-item-count');
let cartItems = document.querySelector('.n2 .cart-items');


// local storage for holding cart items
let savedCartProducts = localStorage.getItem('savedCartProducts');


// array holding user carts 
if(savedCartProducts) cartProducts = JSON.parse(savedCartProducts);
else cartProducts = [];


// set default product quantity value to 1
let productQuant = 1;

// increase product quantity when inc button clicked
incBtn.addEventListener('click', ()=>{
    productQuant++;
    productQuanHtml.innerHTML = productQuant;

});

// reduce product quantity when dec button clicked
decBtn.addEventListener('click', ()=>{
    if(productQuant > 1){
        productQuant--;
        productQuanHtml.innerHTML = productQuant;
    } 
});

// show cart items count when page load
function showCartItemCount(){
    cartCount.innerText = cartProducts.length;
}

showCartItemCount();


// add to cart button function 
addCartBtn.addEventListener('click', ()=>{
    cartProducts.push(
        {
            name: productName,
            price: productPrice * productQuant,
            quantity: productQuant,
            imgUrl: productImage
        }
    );

    localStorage.setItem('savedCartProducts', JSON.stringify(cartProducts));

    showCartItemCount();
    showCartItems();
    // window.location = "index.html";

});

// toggle cart when shop button clicked
let cartOpen = false;
function showCart(){
    if(cartOpen){
        cartItems.style.display = "none";
        cartOpen = false;
    } else {
        cartItems.style.display = "block";
        showCartItems();
        cartOpen = true;
    }
}


// show items in cart 
function showCartItems(){
    let html = '';

    if(cartProducts.length != 0){
        cartProducts.forEach((item, index) => {
            html += `
            <div class="card">
            <img src="${item.imgUrl}" alt="">
            <div class="d1">
                <div class="title">${item.name}</div>
                <div class="price">Price: $${item.price}.00</div>
                <div class="quantity">Quantity: ${item.quantity}</div>
            </div>
            <div class="d2">
                <i class="fa fa-trash" id="${index}" onclick="deleteCartItem(this.id)"></i>
            </div>
        </div>
            `;
    
            cartItems.innerHTML = html;
    
        })
    } else {
        cartItems.innerHTML = "No item currently in your cart";
    }
};

// delete cart item function 

function deleteCartItem(index){
    cartProducts.splice(index, 1);
    localStorage.setItem('savedCartProducts', JSON.stringify(cartProducts));
    // window.location = "index.html";
    showCartItemCount();
    showCartItems();
}