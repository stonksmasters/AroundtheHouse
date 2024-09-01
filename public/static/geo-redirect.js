document.addEventListener("DOMContentLoaded", function() {
    const hostname = window.location.hostname;
    const isLocal = hostname === "localhost" || hostname === "127.0.0.1";
    const currentPath = window.location.pathname;
    const storageKey = "locationRedirected";

    // Temporarily fetch from local Python server for testing
    const ipInfoUrl = isLocal ? "http://127.0.0.1:5000/ipinfo" : "https://your-live-site-url.com/ipinfo";
    
    fetch(ipInfoUrl)
        .then(response => response.json())
        .then(data => {
            const userLocation = data.city.toLowerCase().replace(/\s+/g, '-');
            const locations = {
                "baton-rouge": "Baton Rouge",
                "zachary": "Zachary",
                "prarieville": "Prarieville",
                "denham-springs": "Denham Springs",
                "gonzales": "Gonzales",
                "central": "Central",
                "walker": "Walker",
                "baker": "Baker",
                "port-allen": "Port Allen",
                "addis": "Addis",
                "plaquemine": "Plaquemine",
                "st-amant": "St. Amant",
                "geismar": "Geismar"
            };

            const expectedPath = isLocal ? `/public/${userLocation}` : `/${userLocation}`;
            const isOnCorrectPage = currentPath === expectedPath;

            if (sessionStorage.getItem(storageKey) !== "true") {
                if (locations[userLocation]) {
                    if (!isOnCorrectPage) {
                        const confirmation = confirm(`It looks like you're in ${locations[userLocation]}. Would you like to visit the ${locations[userLocation]} page?`);
                        if (confirmation) {
                            sessionStorage.setItem(storageKey, "true");
                            window.location.href = expectedPath;
                        }
                    }
                } else {
                    const fallbackPath = isLocal ? '/public/baton-rouge' : '/baton-rouge';
                    if (currentPath !== fallbackPath) {
                        sessionStorage.setItem(storageKey, "true");
                        window.location.href = fallbackPath;
                    }
                }
            }
        })
        .catch(error => {
            console.error("Error fetching location data: ", error);
            const fallbackPath = isLocal ? '/public/baton-rouge' : '/baton-rouge';
            if (currentPath !== fallbackPath && sessionStorage.getItem(storageKey) !== "true") {
                sessionStorage.setItem(storageKey, "true");
                window.location.href = fallbackPath;
            }
        });
});
