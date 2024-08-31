document.addEventListener("DOMContentLoaded", function() {
    const hostname = window.location.hostname;
    const isLocal = hostname === "localhost" || hostname === "127.0.0.1";
    const currentPath = window.location.pathname;
    const storageKey = "locationRedirected"; // Key for sessionStorage to store the redirect state

    // Fetch the user's IP information from ipinfo.io
    fetch("https://ipinfo.io?token=044b0523070f3b")
        .then(response => response.json())
        .then(data => {
            const userLocation = data.city.toLowerCase().replace(/\s+/g, '-'); // Convert city name to lowercase and replace spaces with hyphens
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

            // Check if the user has already been redirected or declined
            if (sessionStorage.getItem(storageKey) !== "true") {
                // Check if the user's location is in the list of predefined locations
                if (locations[userLocation]) {
                    if (!isOnCorrectPage) {
                        const confirmation = confirm(`It looks like you're in ${locations[userLocation]}. Would you like to visit the ${locations[userLocation]} page?`);
                        if (confirmation) {
                            sessionStorage.setItem(storageKey, "true");
                            window.location.href = expectedPath;
                        }
                    }
                } else {
                    // If the user's location is not served, redirect to Baton Rouge
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
            // If there's an error fetching location data, redirect to Baton Rouge as a fallback
            const fallbackPath = isLocal ? '/public/baton-rouge' : '/baton-rouge';
            if (currentPath !== fallbackPath && sessionStorage.getItem(storageKey) !== "true") {
                sessionStorage.setItem(storageKey, "true");
                window.location.href = fallbackPath;
            }
        });
});
