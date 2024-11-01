// script.js



let currentSlide = 0;
const slides = document.querySelectorAll('.slides img');
const totalSlides = slides.length;

function showSlide(index) {
    const slider = document.querySelector('.slides');
    slider.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

setInterval(nextSlide, 3000); // Change slide every 3 seconds

/*-----------------------top brands-------------------*/

const topBrandsWrapper = document.querySelector('.top-brands-slider-wrapper');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

let position = 0;
const imageCount = topBrandsWrapper.children.length / 2;
const imageWidth = topBrandsWrapper.querySelector('img').offsetWidth;
const totalWidth = imageWidth * imageCount;

leftArrow.addEventListener('click', function() {
    if (position > 0) {
        position -= 1;
    } else {
        position = imageCount; // Jump to the duplicate set
        topBrandsWrapper.style.transition = 'none'; // Disable transition
        topBrandsWrapper.style.transform = `translateX(-${totalWidth}px)`;
        setTimeout(() => {
            position -= 1;
            topBrandsWrapper.style.transition = 'transform 0.5s ease';
            updateSliderPosition();
        }, 0);
        return;
    }
    updateSliderPosition();
});

rightArrow.addEventListener('click', function() {
    if (position < imageCount * 2 - 1) {
        position += 1;
    } else {
        position = imageCount - 1; // Jump to the start of the duplicate set
        topBrandsWrapper.style.transition = 'none';
        topBrandsWrapper.style.transform = `translateX(-${totalWidth - imageWidth}px)`;
        setTimeout(() => {
            position += 1;
            topBrandsWrapper.style.transition = 'transform 0.5s ease';
            updateSliderPosition();
        }, 0);
        return;
    }
    updateSliderPosition();
});

function updateSliderPosition() {
    const shift = position * imageWidth;
    topBrandsWrapper.style.transform = `translateX(-${shift}px)`;
}

/*  ---------------for login and signup -------------------- */
// Open and close modal functionality for login and signup
document.getElementById("login-link").addEventListener("click", function(e) {
    e.preventDefault();
    document.getElementById("auth-container").style.display = "flex";
    document.getElementById("login-form").style.display = "block";
    document.getElementById("signup-form").style.display = "none";
});

document.getElementById("signup-link").addEventListener("click", function(e) {
    e.preventDefault();
    document.getElementById("auth-container").style.display = "flex";
    document.getElementById("signup-form").style.display = "block";
    document.getElementById("login-form").style.display = "none";
});

// Close modal when clicking outside the form
document.getElementById("auth-container").addEventListener("click", function(e) {
    if (e.target === this) {
        this.style.display = "none";
    }
});

// Close modal using ESC key
document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
        document.getElementById("auth-container").style.display = "none";
    }
});



// ------------------------------add to cart
function addToCart(product) {
    // Retrieve cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product is already in the cart
    let existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        // Update quantity if product is already in the cart
        existingProduct.quantity += product.quantity;
    } else {
        // Add new product to the cart
        cart.push(product);
    }

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart icon notification (you need to define this function)
    updateCartIcon();
}

function updateCartIcon() {
    // Retrieve cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Update cart icon with total item count
    let cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.setAttribute('data-count', totalItems);
    }
}
