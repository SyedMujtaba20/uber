import React, { useState, useEffect } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(center);
  const [isMapVisible, setIsMapVisible] = useState(true); // State to toggle map visibility

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({
          lat: latitude,
          lng: longitude,
        });
      },
      (error) => {
        console.error("Error getting location:", error);
        setIsMapVisible(false); // Show fallback if location can't be fetched
      }
    );

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({
          lat: latitude,
          lng: longitude,
        });
      },
      (error) => {
        console.error("Error watching location:", error);
        setIsMapVisible(false); // Show fallback if tracking fails
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return isMapVisible ? (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition}
        zoom={15}
        onLoad={() => console.log("Map loaded")}
        onError={() => {
          console.error("Error loading map");
          setIsMapVisible(false); // Fallback if map fails to load
        }}
      >
        <Marker position={currentPosition} />
      </GoogleMap>
    </LoadScript>
  ) : (
    // Fallback image when map is not visible
    <img
      className="h-full w-full object-cover"
      src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
      alt=""
    />
  );
};

export default LiveTracking;
