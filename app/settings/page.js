"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

function SettingsPage() {
  const router = useRouter();
  const [autoSend, setAutoSend] = useState(false);

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <button onClick={() => router.push("/")} style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer" }}>
        ← Назад
      </button>
      <h1>Настройки</h1>
      <div style={{ background: "white", padding: "20px", borderRadius: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <span style={{ fontWeight: "bold" }}>Автодоотправка фото</span>
          <button
            onClick={() => setAutoSend(!autoSend)}
            style={{
              width: "50px",
              height: "30px",
              background: autoSend ? "#22c55e" : "#ccc",
              border: "none",
              borderRadius: "15px",
              cursor: "pointer",
              position: "relative"
            }}
          >
            <div style={{
              width: "26px",
              height: "26px",
              background: "white",
              borderRadius: "50%",
              position: "absolute",
              top: "2px",
              left: autoSend ? "22px" : "2px",
              transition: "0.3s"
            }} />
          </button>
        </div>
        <button style={{ width: "100%", padding: "12px", background: "#3b82f6", color: "white", border: "none", borderRadius: "8px", marginBottom: "10px", cursor: "pointer" }}>
          Доотправить фото
        </button>
        <button style={{ width: "100%", padding: "12px", background: "#ef4444", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>
          Сбросить
        </button>
      </div>
    </div>
  );
}

export default SettingsPage;