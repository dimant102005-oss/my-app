"use client";
import { useState, useRef } from "react";

export default function PhotoPage() {
  const [inventory, setInventory] = useState("");
  const [place, setPlace] = useState("");
  const [photos, setPhotos] = useState([]);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
    } catch (error) {
      alert("Ошибка доступа к камере: " + error.message);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(function(track) {
        track.stop();
      });
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const takePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const photoData = canvas.toDataURL("image/png");
      setPhotos([...photos, photoData]);
      stopCamera();
    }
  };

  const handleFileChange = function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        setPhotos([...photos, event.target.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = function() {
    if (!inventory || !place) {
      alert("Заполните все поля");
      return;
    }
    if (photos.length === 0) {
      alert("Сделайте или выберите фото");
      return;
    }
    alert("Фото отправлено!");
    setInventory("");
    setPlace("");
    setPhotos([]);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px", paddingBottom: "80px" }}>
      <h1>Фотоотчёт</h1>

      <div style={{ background: "white", padding: "20px", borderRadius: "12px" }}>
        <input
          type="text"
          placeholder="Инвентарный номер объекта"
          value={inventory}
          onChange={function(e) { setInventory(e.target.value); }}
          style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "8px", marginBottom: "10px" }}
        />

        <input
          type="text"
          placeholder="Название места"
          value={place}
          onChange={function(e) { setPlace(e.target.value); }}
          style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "8px", marginBottom: "10px" }}
        />

        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          {!cameraActive ? (
            <button
              onClick={startCamera}
              style={{ flex: 1, padding: "12px", background: "#3b82f6", color: "white", border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: "bold", cursor: "pointer" }}
            >
              Сделать фото
            </button>
          ) : (
            <button
              onClick={takePhoto}
              style={{ flex: 1, padding: "12px", background: "#ef4444", color: "white", border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: "bold", cursor: "pointer" }}
            >
              Снять
            </button>
          )}

          <label
            style={{ flex: 1, padding: "12px", background: "#6b7280", color: "white", border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: "bold", cursor: "pointer", textAlign: "center" }}
          >
            Выбрать из галереи
            <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
          </label>
        </div>

        {cameraActive && (
          <div style={{ marginBottom: "10px" }}>
            <video ref={videoRef} style={{ width: "100%", borderRadius: "8px" }} autoPlay playsInline />
            <canvas ref={canvasRef} style={{ display: "none" }} />
            <button
              onClick={stopCamera}
              style={{ width: "100%", padding: "10px", background: "#ef4444", color: "white", border: "none", borderRadius: "8px", fontSize: "14px", cursor: "pointer", marginTop: "5px" }}
            >
              Отменить
            </button>
          </div>
        )}

        <button
          onClick={handleSubmit}
          style={{ width: "100%", padding: "15px", background: "#22c55e", color: "white", border: "none", borderRadius: "10px", fontSize: "18px", fontWeight: "bold", cursor: "pointer" }}
        >
          Создать фото
        </button>
      </div>

      {photos.length > 0 && (
        <div style={{ marginTop: "20px", background: "white", padding: "20px", borderRadius: "12px" }}>
          <h3>Фото ({photos.length})</h3>
          {photos.map(function(p, i) {
            return <img key={i} src={p} alt="Фото" style={{ width: "100%", borderRadius: "8px", marginBottom: "10px" }} />;
          })}
          <button
            onClick={function() { setPhotos([]); }}
            style={{ width: "100%", padding: "10px", background: "#ef4444", color: "white", border: "none", borderRadius: "8px", fontSize: "14px", cursor: "pointer" }}
          >
            Очистить все фото
          </button>
        </div>
      )}
    </div>
  );
}