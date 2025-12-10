import React, { useEffect } from "react";
import { Button, Card } from "react-bootstrap";

function InstaPage() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widgets.sociablekit.com/instagram-feed/widget.js";
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div style={{ backgroundColor: "#1c1c1c", minHeight: "100vh", padding: "2rem" }}>
      {/* Hero Section */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ color: "#f5f5f5", marginBottom: "1rem" }}>
          Climbing Club's Instagram Page
        </h1>
        <p style={{ color: "#ddd", maxWidth: "600px", margin: "0 auto" }}>
          Be sure to check out and follow our Instagram page{" "}
          <strong>@climbing_uw</strong> to stay up to date with the club's activities.
        </p>
      </div>

      {/* Instagram Feed Container */}
      <Card
        style={{
          border: "2px solid #2980b9",
          borderRadius: "8px",
          backgroundColor: "#ffffff",
          padding: "1rem",
          maxWidth: "900px",
          margin: "0 auto",
          boxShadow: "0 4px 12px rgba(0,0,0,0.5)"
        }}
      >
        <div className="sk-instagram-feed" data-embed-id="25621187"></div>
      </Card>
    </div>
  );
}

export default InstaPage;