import React, { useEffect } from "react";
import { Button } from "react-bootstrap";

function InstaPage() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widgets.sociablekit.com/instagram-feed/widget.js";
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <h1>Climbing Club's Instagram Page</h1>
      <p>Be sure to check out and follow our Instagram page (@climbing_uw) to stay up to date with the club's activities</p>
      <div className="sk-instagram-feed" data-embed-id="25621187"></div>
    </div>
  );
}

export default InstaPage;
