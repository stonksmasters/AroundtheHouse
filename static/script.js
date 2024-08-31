document.addEventListener("DOMContentLoaded", function () {
    // Scroll animation for mobile and desktop
    let sections = document.querySelectorAll("section");
    const revealSection = () => {
        sections.forEach(section => {
            let sectionTop = section.getBoundingClientRect().top;
            let sectionBottom = section.getBoundingClientRect().bottom;
            let triggerPoint = window.innerHeight * 0.85;

            if (sectionTop < triggerPoint && sectionBottom > 0) {
                section.classList.add("visible");
            } else {
                section.classList.remove("visible");
            }
        });
    };
    window.addEventListener("scroll", revealSection);
    revealSection(); // Initial check to reveal sections already in view

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();

            let headerOffset = document.querySelector("header").offsetHeight;
            let element = document.querySelector(this.getAttribute("href"));
            let elementPosition = element.getBoundingClientRect().top;
            let offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });

            // Close the mobile menu after clicking an anchor link
            if (navMenu.classList.contains("show")) {
                navMenu.classList.remove("show");
                navMenu.classList.add("hide");
            }
        });
    });

    // Toggle Navigation Menu
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    const closeMenu = document.getElementById("close-menu");
    const header = document.querySelector("header");

    function adjustNavMenuPosition() {
        navMenu.style.top = `${header.offsetHeight}px`;
    }

    menuToggle.addEventListener("click", function () {
        if (navMenu.classList.contains("show")) {
            navMenu.classList.remove("show");
            navMenu.classList.add("hide");
        } else {
            navMenu.classList.remove("hide");
            navMenu.classList.add("show");
            adjustNavMenuPosition(); // Adjust the menu position when opened
        }
    });

    closeMenu.addEventListener("click", function () {
        navMenu.classList.remove("show");
        navMenu.classList.add("hide");
    });

    // FAQ Toggle
    document.querySelectorAll(".faq-item h3").forEach(item => {
        item.addEventListener("click", () => {
            let parent = item.parentElement;
            document.querySelectorAll(".faq-item").forEach(faq => {
                if (faq !== parent) faq.classList.remove("active");
            });
            parent.classList.toggle("active");
        });
    });

    // reCAPTCHA Enterprise Integration
    document.querySelector("#contact-form").addEventListener("submit", async function (e) {
        e.preventDefault(); // Prevent the form from submitting immediately

        grecaptcha.enterprise.ready(async function () {
            const token = await grecaptcha.enterprise.execute('6LeAiTEqAAAAANLE-JQ2NjzdUIzQBn95q_KU16J9', { action: 'submit' });
            const response = await fetch("/api/recaptcha/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: token, action: 'submit' })
            });
            const result = await response.json();

            if (result.success) {
                console.log("reCAPTCHA verified successfully.");
                e.target.submit();
            } else {
                console.error("reCAPTCHA verification failed.");
                alert("reCAPTCHA verification failed. Please try again.");
            }
        });
    });
});
