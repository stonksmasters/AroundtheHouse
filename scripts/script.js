document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
});

// Add smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Toggle the navigation menu
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const closeMenu = document.getElementById('close-menu');

menuToggle.addEventListener('click', function() {
    if (navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
        navMenu.classList.add('hide');
    } else {
        navMenu.classList.remove('hide');
        navMenu.classList.add('show');
    }
});

closeMenu.addEventListener('click', function() {
    navMenu.classList.remove('show');
    navMenu.classList.add('hide');
});

document.querySelectorAll('.faq-item h3').forEach(item => {
    item.addEventListener('click', () => {
        const parent = item.parentElement;
        document.querySelectorAll('.faq-item').forEach(faq => {
            if (faq !== parent) faq.classList.remove('active');
        });
        parent.classList.toggle('active');
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll(".testimonial-item");
    let currentItem = 0;

    function showNextItem() {
        items[currentItem].classList.remove("active");
        items[currentItem].classList.add("previous");

        currentItem = (currentItem + 1) % items.length;

        items[currentItem].classList.add("active");
        items[currentItem].classList.remove("previous");
    }

    setInterval(showNextItem, 5000); // Adjust the timing as needed
});

