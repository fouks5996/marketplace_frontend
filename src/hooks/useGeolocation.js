import React, { useEffect, useState } from "react";

export const useGeolocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
  });

  const onSuccess = (location) => {
    setLocation({
      location: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };


  const onError = error => {
   setLocation({
      location: true,
         error,
      
    });
  }

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
         code: 0,
         message: "Geolocation not supported",
      })
      
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);
  return <div>useGeolocation</div>;
};
