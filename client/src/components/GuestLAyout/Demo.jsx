import React from "react";
import { useNavigate } from "react-router-dom";

export default function Demo() {
  const navigate = useNavigate();

  const styles = {
    page: {
      minHeight: "100vh",
      padding: "40px 20px",
      textAlign: "center",
      background: "linear-gradient(135deg, #f4f7fc, #e8f0ff)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },

    header: {
      marginBottom: "30px",
    },

    title: {
      fontSize: "2.5rem",
      color: "#1a237e",
      marginBottom: "10px",
    },

    subtitle: {
      fontSize: "1.1rem",
      color: "#555",
    },

    videoWrapper: {
      width: "100%",
      maxWidth: "900px",
      marginBottom: "30px",
    },

    videoPlaceholder: {
      background: "#fff",
      border: "3px dashed #3f51b5",
      borderRadius: "15px",
      padding: "80px 20px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    },

    actions: {
      display: "flex",
      gap: "15px",
      flexWrap: "wrap",
      justifyContent: "center",
    },

    primaryBtn: {
      padding: "12px 28px",
      backgroundColor: "#3f51b5",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "1rem",
      fontWeight: "600",
    },

    secondaryBtn: {
      padding: "12px 28px",
      backgroundColor: "#e0e0e0",
      color: "#333",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "1rem",
      fontWeight: "600",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Watch the MBANK Demo</h1>
        <p style={styles.subtitle}>
          See how our blockchain-powered banking platform works in action.
        </p>
      </div>

      <div style={styles.videoWrapper}>
        {/* Replace the video ID below with your own */}
        <iframe
          width="100%"
          height="500"
          src="https://www.youtube.com/embed/4UA2kbHo97E?si=ZvopxaQzQnk9qBaS"
          title="MBANK Demo"
          frameBorder="0"
          allowFullScreen
          style={{
            borderRadius: "15px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          }}
        ></iframe>
      </div>

      <div style={styles.actions}>
        <button
          style={styles.primaryBtn}
          onClick={() => navigate(-1)}
        >
          Back
        </button>

        <button
          style={styles.secondaryBtn}
          onClick={() => navigate("/")}
        >
          Return Home
        </button>
      </div>
    </div>
  );
}