// Add smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const headerOffset = document.querySelector('header').offsetHeight;
        const element = document.querySelector(this.getAttribute('href'));
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        // Close the mobile menu after clicking an anchor link
        if (navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
            navMenu.classList.add('hide');
        }
    });
});

// Toggle the navigation menu
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const closeMenu = document.getElementById('close-menu');
const header = document.querySelector('header');

function adjustNavMenuPosition() {
    navMenu.style.top = `${header.offsetHeight}px`;
}

menuToggle.addEventListener('click', function() {
    if (navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
        navMenu.classList.add('hide');
    } else {
        navMenu.classList.remove('hide');
        navMenu.classList.add('show');
        adjustNavMenuPosition(); // Adjust the menu position when opened
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
    const testimonialItems = document.querySelectorAll(".testimonial-item");
    let currentTestimonialItem = 0;

    function showNextTestimonialItem() {
        testimonialItems[currentTestimonialItem].classList.remove("active");
        testimonialItems[currentTestimonialItem].classList.add("previous");

        currentTestimonialItem = (currentTestimonialItem + 1) % testimonialItems.length;

        testimonialItems[currentTestimonialItem].classList.add("active");
        testimonialItems[currentTestimonialItem].classList.remove("previous");
    }

    setInterval(showNextTestimonialItem, 5000); // Adjust the timing as needed

    const galleryItems = document.querySelectorAll(".gallery-item");
    let currentGalleryItem = 0;

    function showNextGalleryItem() {
        galleryItems[currentGalleryItem].classList.remove("active");
        galleryItems[currentGalleryItem].classList.add("previous");

        currentGalleryItem = (currentGalleryItem + 1) % galleryItems.length;

        galleryItems[currentGalleryItem].classList.add("active");
        galleryItems[currentGalleryItem].classList.remove("previous");
    }

    setInterval(showNextGalleryItem, 5000); // Adjust the timing as needed
});