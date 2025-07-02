// write or paste code here

document.addEventListener("DOMContentLoaded", function () {
  const hostname = window.location.hostname;
  const isLocal = hostname === "localhost" || hostname === "127.0.0.1";
  const currentPath = window.location.pathname.replace(/\/$/, ""); // strip trailing slash
  const storageKey = "locationRedirected";

  // Map of your new service towns
  const locations = {
    "jarrell":      "Jarrell",
    "thrall":       "Thrall",
    "salado":       "Salado",
    "taylor":       "Taylor",
    "hutto":        "Hutto",
    "georgetown":   "Georgetown",
    "round-rock":   "Round Rock",
    "pflugerville": "Pflugerville",
    "leander":      "Leander",
    "cedar-park":   "Cedar Park"
  };

  function handleRedirection(userLocation) {
    const expectedPath = `/${userLocation}`;
    const isHomePage = currentPath === "" || currentPath === "/" || currentPath === "/index.html";
    const isOnCorrectPage = currentPath === expectedPath || (isHomePage && userLocation === "jarrell");

    // If we’ve already redirected or user declined, do nothing
    if (sessionStorage.getItem(storageKey) === "true") return;

    if (locations[userLocation]) {
      // If not already on the right page, ask
      if (!isOnCorrectPage) {
        const wantsRedirect = confirm(
          `It looks like you're in ${locations[userLocation]}. Would you like to go to the ${locations[userLocation]} page?`
        );
        sessionStorage.setItem(storageKey, "true");
        if (wantsRedirect) window.location.href = expectedPath;
      }
    } else {
      // Not in service area — send to Jarrell by default
      const fallback = "/jarrell";
      if (currentPath !== fallback) {
        sessionStorage.setItem(storageKey, "true");
        window.location.href = fallback;
      }
    }
  }

  // Try HTML5 Geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude: lat, longitude: lon } = pos.coords;
        // reverse-geocode via BigDataCloud
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
          .then(r => r.json())
          .then(data => {
            const city = (data.city || "").toLowerCase().replace(/\s+/g, "-");
            handleRedirection(city);
          })
          .catch(_ => {
            // on error, fallback
            if (!sessionStorage.getItem(storageKey)) {
              sessionStorage.setItem(storageKey, "true");
              window.location.href = "/jarrell";
            }
          });
      },
      _err => {
        // permission denied or other location error
        if (!sessionStorage.getItem(storageKey)) {
          sessionStorage.setItem(storageKey, "true");
          window.location.href = "/jarrell";
        }
      },
      { timeout: 10000, maximumAge: 60000 }
    );
  } else {
    // no geolocation support
    if (!sessionStorage.getItem(storageKey)) {
      sessionStorage.setItem(storageKey, "true");
      window.location.href = "/jarrell";
    }
  }
});
