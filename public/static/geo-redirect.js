document.addEventListener("DOMContentLoaded", function () {
    const hostname = window.location.hostname;
    const isLocal = hostname === "localhost" || hostname === "127.0.0.1";
    const currentPath = window.location.pathname.replace(/\/$/, ""); // Remove trailing slash if any
    const storageKey = "locationRedirected"; // Key for sessionStorage to store the redirect state

    console.log("Hostname:", hostname);
    console.log("Is local environment:", isLocal);
    console.log("Current path:", currentPath);

    // Fetch the user's IP information from ipinfo.io
    fetch("https://ipinfo.io?token=044b0523070f3b")
        .then(response => {
            console.log("IP info response status:", response.status);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log("IP info data received:", data);

            const userLocation = data.city.toLowerCase().replace(/\s+/g, '-'); // Convert city name to lowercase and replace spaces with hyphens
            console.log("User location (formatted):", userLocation);

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

            // Check if the user's location is in the list of predefined locations
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
                // If the user's location is not served, redirect to Baton Rouge
                console.log("User's location is not served, redirecting to Baton Rouge.");
                const fallbackPath = isLocal ? '/public/baton-rouge' : '/baton-rouge';
                if (currentPath !== fallbackPath) {
                    sessionStorage.setItem(storageKey, "true");
                    window.location.href = fallbackPath;
                }
            }
        })
        .catch(error => {
            console.error("Error fetching location data:", error);
            // If there's an error fetching location data, redirect to Baton Rouge as a fallback
            const fallbackPath = isLocal ? '/public/baton-rouge' : '/baton-rouge';
            if (currentPath !== fallbackPath && sessionStorage.getItem(storageKey) !== "true") {
                sessionStorage.setItem(storageKey, "true");
                window.location.href = fallbackPath;
            }
        });
});
