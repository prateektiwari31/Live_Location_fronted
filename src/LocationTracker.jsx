import { useState } from "react";
import "./LocationTracker.css";

function LocationTracker() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const getLocation = () => {
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetch(`${import.meta.env.VITE_API_URL}/api/location`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
        })
          .then((res) => res.json())
          .then((data) => {
            setLocation(data);
            setLoading(false);
          })
          .catch((err) => {
            console.error("Error fetching location:", err);
            setLoading(false);
          });
      },
      () => {
        alert("Location permission denied");
        setLoading(false);
      }
    );
  };

  return (
    <div className="container">
      <h1>Live Location Finder</h1>

      <button className="location-btn" onClick={getLocation} disabled={loading}>
        {loading ? "Fetching location..." : "📍 Get My Location"}
      </button>

      {location && (
        <div className="location-card">
          <p><b>Place:</b> {location.place}</p>
          <p><b>City:</b> {location.city}</p>
          <p><b>State:</b> {location.state}</p>
          <p><b>Pincode:</b> {location.pincode}</p>
          <p><b>Country:</b> {location.country}</p>
        </div>
      )}
    </div>
  );
}

export default LocationTracker;
