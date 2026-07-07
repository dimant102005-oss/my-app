"use client";
import { useRouter, usePathname } from "next/navigation";

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { path: "/", label: "Главная" },
    { path: "/photo", label: "Фото" },
    { path: "/settings", label: "Настройки" },
  ];

  return (
    <div style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      background: "white",
      display: "flex",
      justifyContent: "space-around",
      padding: "10px 0 14px 0",
      borderTop: "1px solid #e5e7eb",
      boxShadow: "0 -2px 10px rgba(0,0,0,0.06)",
      zIndex: 1000
    }}>
      {navItems.map(({ path, label }) => {
        const isActive = pathname === path;
        return (
          <button
            key={path}
            onClick={() => router.push(path)}
            style={{
              background: "none",
              border: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              color: isActive ? "#3b82f6" : "#9ca3af",
              fontSize: "13px",
              fontWeight: isActive ? "600" : "400",
              padding: "4px 16px",
              transition: "all 0.2s"
            }}
          >
            <span style={{ fontSize: "20px", marginBottom: "2px" }}>
              {label === "Главная" && "🏠"}
              {label === "Фото" && "📷"}
              {label === "Настройки" && "⚙️"}
            </span>
            {label}
          </button>
        );
      })}
    </div>
  );
}