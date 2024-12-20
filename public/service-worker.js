//cannot import anything here

self.addEventListener("install", () => {
  self.skipWaiting();
  console.log("Service Worker: Installed");
});

self.addEventListener("activate", () => {
  console.log("Service Worker: Activated");
  // You can skip waiting to activate the service worker immediately
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  console.log("Service Worker: Fetching", event.request.url);
  // For now, just respond with a basic response (this doesn't interfere with your app's fetch requests)
  event.respondWith(new Response("Service Worker is active!"));
});

self.addEventListener("message", async (event) => {
  console.log("Service Worker: Message received");

  if (event.data && event.data.type === "custom_event") {
    const timeStamp = new Date().toISOString();
    console.log("Service Worker: Custom event triggered");
    try {
      const response = await fetch(
        `http://localhost:3000/api/modify/service_worker_test/${timeStamp}`
      );

      // Check if the response was successful (status code 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse the response (if needed)
      const data = await response.text(); // or response.json()

      console.log("Service Worker: Custom event triggered response", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    console.log("Service Worker: Custom event triggered response", response);
  }
});
