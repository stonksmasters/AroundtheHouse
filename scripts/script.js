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

// FAQ Toggle Functionality
document.querySelectorAll('.faq-item h3').forEach(item => {
    item.addEventListener('click', () => {
        const parent = item.parentElement;
        document.querySelectorAll('.faq-item').forEach(faq => {
            if (faq !== parent) faq.classList.remove('active');
        });
        parent.classList.toggle('active');
    });
});

// Testimonial Carousel Functionality
document.addEventListener("DOMContentLoaded", function () {
    const testimonialItems = document.querySelectorAll(".testimonial-item");
    let currentTestimonial = 0;

    function showNextTestimonial() {
        testimonialItems[currentTestimonial].classList.remove("active");
        testimonialItems[currentTestimonial].classList.add("previous");

        currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;

        testimonialItems[currentTestimonial].classList.add("active");
        testimonialItems[currentTestimonial].classList.remove("previous");
    }

    setInterval(showNextTestimonial, 5000); // Adjust the timing as needed

    // Gallery Carousel Functionality
    const galleryItems = document.querySelectorAll(".gallery-item");
    let currentGallery = 0;

    function showNextGalleryItem() {
        galleryItems[currentGallery].classList.remove("active");
        galleryItems[currentGallery].classList.add("previous");

        currentGallery = (currentGallery + 1) % galleryItems.length;

        galleryItems[currentGallery].classList.add("active");
        galleryItems[currentGallery].classList.remove("previous");
    }

    setInterval(showNextGalleryItem, 5000); // Adjust the timing as needed
});
