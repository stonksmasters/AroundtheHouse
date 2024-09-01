document.addEventListener("DOMContentLoaded", function () {
    const hostname = window.location.hostname;
    const isLocal = hostname === "localhost" || hostname === "127.0.0.1";
    const currentPath = window.location.pathname.replace(/\/$/, ""); // Remove trailing slash if any
    const storageKey = "locationRedirected"; // Key for sessionStorage to store the redirect state

    console.log("Hostname:", hostname);
    console.log("Is local environment:", isLocal);
    console.log("Current path:", currentPath);

    // Check if the user's location is in the list of predefined locations
    const locations = {
        "baton-rouge": "Baton Rouge",
        "zachary": "Zachary",
        "prairieville": "Prairieville",
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

    // Use Geolocation API to get the user's current position
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // Using reverse geocoding to get the city from the coordinates
            fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
                .then(response => response.json())
                .then(data => {
                    const userLocation = data.city.toLowerCase().replace(/\s+/g, '-'); // Convert city name to lowercase and replace spaces with hyphens
                    console.log("User location (formatted):", userLocation);

                    const expectedPath = isLocal ? `/public/${userLocation}` : `/${userLocation}`;
                    const normalizedExpectedPath = expectedPath.replace(/\/$/, ""); // Remove trailing slash if any

                    console.log("Expected path based on location:", normalizedExpectedPath);

                    const isHomePage = currentPath === "" || currentPath === "/" || currentPath === "/index.html";
                    const isOnCorrectPage = currentPath === normalizedExpectedPath || (isHomePage && userLocation === "baton-rouge");

                    console.log("Is on correct page:", isOnCorrectPage);

                    // Check if the user has already been redirected or declined
                    if (sessionStorage.getItem(storageKey) === "true") {
                        console.log("User has already been redirected or declined redirection.");
                        return;
                    }

                    if (locations[userLocation]) {
                        if (!isOnCorrectPage) {
                            console.log("User is not on the correct page, asking for redirection consent.");
                            const confirmation = confirm(`It looks like you're in ${locations[userLocation]}. Would you like to visit the ${locations[userLocation]} page?`);
                            if (confirmation) {
                                console.log("User accepted redirection.");
                                sessionStorage.setItem(storageKey, "true");
                                window.location.href = normalizedExpectedPath;
                            } else {
                                console.log("User declined redirection.");
                                sessionStorage.setItem(storageKey, "true");
                            }
                        } else {
                            console.log("User is already on the correct page.");
                        }
                    } else {
                        console.log("User's location is not served, redirecting to Baton Rouge.");
                        const fallbackPath = isLocal ? '/public/baton-rouge' : '/baton-rouge';
                        if (currentPath !== fallbackPath) {
                            sessionStorage.setItem(storageKey, "true");
                            window.location.href = fallbackPath;
                        }
                    }
                })
                .catch(error => {
                    console.error("Error during reverse geocoding:", error);
                    const fallbackPath = isLocal ? '/public/baton-rouge' : '/baton-rouge';
                    if (currentPath !== fallbackPath && sessionStorage.getItem(storageKey) !== "true") {
                        sessionStorage.setItem(storageKey, "true");
                        window.location.href = fallbackPath;
                    }
                });
        }, error => {
            console.error("Error getting user's location:", error);
            const fallbackPath = isLocal ? '/public/baton-rouge' : '/baton-rouge';
            if (currentPath !== fallbackPath && sessionStorage.getItem(storageKey) !== "true") {
                sessionStorage.setItem(storageKey, "true");
                window.location.href = fallbackPath;
            }
        });
    } else {
        console.error("Geolocation is not supported by this browser.");
        const fallbackPath = isLocal ? '/public/baton-rouge' : '/baton-rouge';
        if (currentPath !== fallbackPath && sessionStorage.getItem(storageKey) !== "true") {
            sessionStorage.setItem(storageKey, "true");
            window.location.href = fallbackPath;
        }
    }
});
