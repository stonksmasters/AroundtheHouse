// geo-redirect.js
document.addEventListener("DOMContentLoaded", function () {
    const locationMap = {
        "baton-rouge": {lat: 30.4515, lon: -91.1871, url: "/baton-rouge"},
        "prarieville": {lat: 30.3025, lon: -90.9711, url: "/prarieville"},
        "zachary": {lat: 30.6480, lon: -91.1565, url: "/zachary"},
        "denham-springs": {lat: 30.4861, lon: -90.9565, url: "/denham-springs"},
        "gonzales": {lat: 30.2385, lon: -90.9201, url: "/gonzales"},
        "central": {lat: 30.5543, lon: -91.0364, url: "/central"},
        "walker": {lat: 30.4868, lon: -90.8612, url: "/walker"},
        "baker": {lat: 30.5888, lon: -91.1685, url: "/baker"},
        "port-allen": {lat: 30.4524, lon: -91.2101, url: "/port-allen"},
        "addis": {lat: 30.3549, lon: -91.2676, url: "/addis"},
        "plaquemine": {lat: 30.2899, lon: -91.2343, url: "/plaquemine"},
        "st-amant": {lat: 30.2144, lon: -90.8533, url: "/st-amant"},
        "geismar": {lat: 30.2266, lon: -91.0148, url: "/geismar"}
    };

    function getDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the Earth in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in km
        return distance;
    }

    function redirectToLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const userLat = position.coords.latitude;
                const userLon = position.coords.longitude;

                let closestLocation = "baton-rouge"; // Default location
                let closestDistance = Infinity;

                for (const [location, data] of Object.entries(locationMap)) {
                    const distance = getDistance(userLat, userLon, data.lat, data.lon);
                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestLocation = location;
                    }
                }

                const redirectUrl = locationMap[closestLocation].url;
                if (!window.location.pathname.includes(redirectUrl)) {
                    window.location.href = redirectUrl;
                }
            }, function() {
                fallbackRedirect();
            });
        } else {
            fallbackRedirect();
        }
    }

    function fallbackRedirect() {
        if (!window.location.pathname.includes("/baton-rouge")) {
            window.location.href = "/baton-rouge";
        }
    }

    redirectToLocation();
});
