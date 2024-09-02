document.addEventListener("DOMContentLoaded", function () {
    let hostname = window.location.hostname;
    let isLocal = hostname === "localhost" || hostname === "127.0.0.1";
    let currentPath = window.location.pathname.replace(/\/$/, "");
    let storageKey = "locationRedirected"; // Key for sessionStorage
    console.log("Hostname:", hostname);
    console.log("Is local environment:", isLocal);
    console.log("Current path:", currentPath);

    let locations = {
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

    // Check if geolocation is supported
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                let latitude = position.coords.latitude;
                let longitude = position.coords.longitude;
                fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
                    .then(response => response.json())
                    .then(data => {
                        let userLocation = data.city.toLowerCase().replace(/\s+/g, "-");
                        console.log("User location (formatted):", userLocation);

                        let expectedPath = isLocal ? `/public/${userLocation}` : `/${userLocation}`;
                        expectedPath = expectedPath.replace(/\/$/, ""); // Trim any trailing slashes
                        console.log("Expected path based on location:", expectedPath);

                        let isOnCorrectPage =
                            currentPath === expectedPath ||
                            (currentPath === "" || currentPath === "/" || currentPath === "/index.html") && userLocation === "baton-rouge";

                        console.log("Is on correct page:", isOnCorrectPage);

                        if (sessionStorage.getItem(storageKey) === "true") {
                            console.log("User has already been redirected or declined redirection.");
                            return;
                        }

                        if (locations[userLocation]) {
                            if (!isOnCorrectPage) {
                                let confirmation = confirm(`It looks like you're in ${locations[userLocation]}. Would you like to visit the ${locations[userLocation]} page?`);
                                if (confirmation) {
                                    sessionStorage.setItem(storageKey, "true");
                                    window.location.href = expectedPath;
                                } else {
                                    sessionStorage.setItem(storageKey, "true");
                                }
                            } else {
                                console.log("User is already on the correct page.");
                            }
                        } else {
                            console.log("User's location is not served, redirecting to Baton Rouge.");
                            let fallbackPath = isLocal ? "/public/baton-rouge" : "/baton-rouge";
                            if (currentPath !== fallbackPath) {
                                sessionStorage.setItem(storageKey, "true");
                                window.location.href = fallbackPath;
                            }
                        }
                    })
                    .catch(error => {
                        console.error("Error during reverse geocoding:", error);
                        let fallbackPath = isLocal ? "/public/baton-rouge" : "/baton-rouge";
                        if (currentPath !== fallbackPath && sessionStorage.getItem(storageKey) !== "true") {
                            sessionStorage.setItem(storageKey, "true");
                            window.location.href = fallbackPath;
                        }
                    });
            },
            error => {
                console.error("Error getting user's location:", error);
                let fallbackPath = isLocal ? "/public/baton-rouge" : "/baton-rouge";
                if (currentPath !== fallbackPath && sessionStorage.getItem(storageKey) !== "true") {
                    sessionStorage.setItem(storageKey, "true");
                    window.location.href = fallbackPath;
                }
            }
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
        let fallbackPath = isLocal ? "/public/baton-rouge" : "/baton-rouge";
        if (currentPath !== fallbackPath && sessionStorage.getItem(storageKey) !== "true") {
            sessionStorage.setItem(storageKey, "true");
            window.location.href = fallbackPath;
        }
    }
});
