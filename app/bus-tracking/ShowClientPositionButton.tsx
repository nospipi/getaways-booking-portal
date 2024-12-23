"use client";

import { useEffect, useState } from "react";

//----------------------------------------------

const ShowClientPositionButton = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if geolocation is available in the browser
    if (navigator.geolocation) {
      // Get the current position of the device
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Update the state with the device's latitude and longitude
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          // Handle errors (e.g., permission denied, position unavailable)
          setError(`Error: ${err.message}`);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }

    // Optional: Watch the position for continuous updates
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (err) => {
        setError(`Error: ${err.message}`);
      }
    );

    // Cleanup function to stop watching when the component is unmounted
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return <div>TEST</div>;
};

export default ShowClientPositionButton;
