document.addEventListener("DOMContentLoaded", function () {
    let sections = document.querySelectorAll("section");
    let handleScroll = () => {
        sections.forEach(section => {
            let rectTop = section.getBoundingClientRect().top;
            let rectBottom = section.getBoundingClientRect().bottom;
            if (rectTop < 0.85 * window.innerHeight && rectBottom > 0) {
                section.classList.add("visible");
            } else {
                section.classList.remove("visible");
            }
        });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (event) {
            event.preventDefault();
            let headerHeight = document.querySelector("header").offsetHeight;
            let targetSection = document.querySelector(this.getAttribute("href"));
            let scrollPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: scrollPosition,
                behavior: "smooth",
            });

            let navMenu = document.getElementById("nav-menu");
            if (navMenu.classList.contains("show")) {
                navMenu.classList.remove("show");
                navMenu.classList.add("hide");
            }
        });
    });

    let menuToggle = document.getElementById("menu-toggle");
    let navMenu = document.getElementById("nav-menu");
    let header = document.querySelector("header");

    // Ensure the elements exist before adding event listeners
    if (menuToggle && navMenu && header) {
        menuToggle.addEventListener("click", function () {
            if (navMenu.classList.contains("show")) {
                navMenu.classList.remove("show");
                navMenu.classList.add("hide");
            } else {
                navMenu.classList.remove("hide");
                navMenu.classList.add("show");
                navMenu.style.top = `${header.offsetHeight}px`;
            }
        });
    }

    // FAQ toggle functionality
    document.querySelectorAll(".faq-item h3").forEach(faq => {
        faq.addEventListener("click", () => {
            let parentItem = faq.parentElement;
            document.querySelectorAll(".faq-item").forEach(item => {
                if (item !== parentItem) item.classList.remove("active");
            });
            parentItem.classList.toggle("active");
        });
    });
});
