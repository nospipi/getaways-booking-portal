"use client";
import { useEffect } from "react";

const ServiceWorkerClient = () => {
  const registerServiceWorker = async () => {
    try {
      const registration = await navigator.serviceWorker.register(
        "/service-worker.js",
        {
          scope: "/",
          updateViaCache: "none",
        }
      );

      console.log("Service Worker registered successfully");

      window.addEventListener("custom_event", () => {
        console.log("Custom event received in the listener");
        if (registration.active) {
          console.log("Sending message to the service worker");
          registration.active.postMessage({
            type: "custom_event",
          });
        }
      });
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  };

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      registerServiceWorker();
    }
  }, []);

  return null;
};

export default ServiceWorkerClient;
