"use client";
import { useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("off");
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const getLocation = () => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve({ lat: 55.7558, lng: 37.6173, demo: true });
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            demo: false,
          });
        },
        () => {
          resolve({ lat: 55.7558, lng: 37.6173, demo: true });
        },
        { enableHighAccuracy: false, timeout: 30000, maximumAge: 60000 }
      );
    });
  };

  const toggleStatus = async () => {
    const newStatus = status === "off" ? "on" : "off";
    if (newStatus === "on") {
      setLoading(true);
      const coords = await getLocation();
      setLocation(coords);
      setStatus(newStatus);
      alert("На объекте\n" + "Широта: " + coords.lat + "\nДолгота: " + coords.lng);
      setLoading(false);
    } else {
      setStatus(newStatus);
      setLocation(null);
      alert("Вне объекта");
    }
  };

  return (
    <div style={{ maxWidth: "480px", margin: "0 auto", padding: "16px" }}>
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", margin: 0, color: "#1a1a1a" }}>СКИТ.СП</h1>
      </div>

      <div style={{ background: "white", borderRadius: "16px", padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <h2 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 12px 0", color: "#333" }}>Статус работы</h2>
        <button
          onClick={toggleStatus}
          disabled={loading}
          style={{
            width: "100%",
            padding: "16px",
            background: status === "on" ? "#22c55e" : "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "12px",
            fontSize: "18px",
            fontWeight: "600",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1,
            transition: "all 0.2s"
          }}
        >
          {loading ? "Получение..." : (status === "on" ? "На объекте" : "Вне объекта")}
        </button>
        {location && (
          <div style={{ marginTop: "12px", fontSize: "13px", color: "#666", textAlign: "center" }}>
            📍 {location.lat}, {location.lng}
          </div>
        )}
      </div>

      <div style={{ marginTop: "16px", background: "white", borderRadius: "16px", padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <h2 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 12px 0", color: "#333" }}>Фотоотчёт</h2>
        <button
          onClick={() => window.location.href = "/photo"}
          style={{
            width: "100%",
            padding: "14px",
            background: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.2s"
          }}
        >
          Отправить фото
        </button>
      </div>

      <div style={{ marginTop: "16px", background: "white", borderRadius: "16px", padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <h2 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 12px 0", color: "#333" }}>Настройки</h2>
        <button
          onClick={() => window.location.href = "/settings"}
          style={{
            width: "100%",
            padding: "14px",
            background: "#f59e0b",
            color: "white",
            border: "none",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.2s"
          }}
        >
          Перейти в настройки
        </button>
      </div>
    </div>
  );
}