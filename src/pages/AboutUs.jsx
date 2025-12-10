import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { FaUsers, FaMapMarkerAlt, FaInfoCircle } from "react-icons/fa";

// Officer images (PNGs)
import miriImg from "../assets/images/CCUW_miri.png";
import miaImg from "../assets/images/CCUW_mia.png";
import peytonImg from "../assets/images/CCUW_peyton.png";
import ianImg from "../assets/images/CCUW_ian.png";

function AboutUs() {
  return (
    <div style={{ padding: "2rem", backgroundColor: "#1c1c1c", color: "#f5f5f5" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ color: "#f5f5f5" }}>About Us</h1>
        <p>What is Climbing Club UW all about? Find out below!</p>
      </div>

      {/* What is Climbing Club */}
      <h2 style={{ color: "#f5f5f5" }}>What is Climbing Club?</h2>
      <Card style={{ marginBottom: "1rem", border: "4px solid #2c3e50" }}>
        <Card.Body style={{ backgroundColor: "#ffffff", color: "#2c3e50" }}>
          <Card.Title>
            <FaUsers style={{ marginRight: "8px" }} />
            Community & Fun
          </Card.Title>
          <Card.Text>
            The Climbing Club is a place where everyone interested in climbing can come together,
            learn from each other, and have a good time. We are open to all skill levels and
            excited to help beginners start their journey. Our goal is to cultivate a welcoming,
            non‑judgmental community that shares the joy of climbing. <strong>No club dues</strong> are required to join!
            Just bring a positive attitude and enthusiasm and you'll be all set to climb with us.
            See more of the below information about our meetings and gym details so you can get started!
            <br />
            <br />
            Also, please visit the WIN website below to register as a member of the UW Climbing Club and join the email list:
            <br />
            <br />
            <Button
              variant="primary"
              style={{ fontWeight: "bold", boxShadow: "0 4px 8px rgba(0,0,0,0.3)" }}
              href="https://win.wisc.edu/organization/climbingclub"
              target="_blank"
              rel="noopener noreferrer"
            >
            Visit our WIN page
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>

      {/* Meetings Section */}
      <h2 style={{ color: "#f5f5f5" }}>When & Where Do We Meet?</h2>
      <Card style={{ marginBottom: "1rem", border: "4px solid #27ae60" }}>
        <Card.Body style={{ backgroundColor: "#ffffff", color: "#2c3e50" }}>
          <Card.Title style={{ color: "#27ae60" }}>
            <FaMapMarkerAlt style={{ marginRight: "8px" }} />
            Meeting Times
          </Card.Title>
          <Card.Text>
            <strong>Boulder's Climbing Gym – Downtown</strong> <br />
            <br />
            Every Wednesday: 6pm – 8pm <br />
            Every Saturday/Sunday: 6pm – 8pm (After Hours!) <br />
            <br />
            <strong>Note:</strong> If football is in season, it is likely meetings will be Sunday instead of Saturday. <br />
            Also, after hours climbs are subject to change — check our Instagram or the Schedule page for updates.
          </Card.Text>
        </Card.Body>
      </Card>

      {/* Officers Section */}
      <h2 style={{ color: "#f5f5f5", marginTop: "2rem" }}>Meet the Officers</h2>
      <Row>
        <Col md={3} sm={6} xs={12} style={{ marginBottom: "1rem" }}>
          <Card style={{ border: "4px solid #8e44ad", textAlign: "center" }}>
            <Card.Img variant="top" src={miriImg} style={{ maxWidth: "100%", height: "auto" }} />
            <Card.Body style={{ backgroundColor: "#ffffff", color: "#2c3e50" }}>
              <Card.Title style={{ color: "#8e44ad" }}>Miri</Card.Title>
              <Card.Text>President</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} xs={12} style={{ marginBottom: "1rem" }}>
          <Card style={{ border: "4px solid #e67e22", textAlign: "center" }}>
            <Card.Img variant="top" src={miaImg} style={{ maxWidth: "100%", height: "auto" }} />
            <Card.Body style={{ backgroundColor: "#ffffff", color: "#2c3e50" }}>
              <Card.Title style={{ color: "#e67e22" }}>Mia</Card.Title>
              <Card.Text>Vice President</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} xs={12} style={{ marginBottom: "1rem" }}>
          <Card style={{ border: "4px solid #16a085", textAlign: "center" }}>
            <Card.Img variant="top" src={peytonImg} style={{ maxWidth: "100%", height: "auto" }} />
            <Card.Body style={{ backgroundColor: "#ffffff", color: "#2c3e50" }}>
              <Card.Title style={{ color: "#16a085" }}>Peyton</Card.Title>
              <Card.Text>Treasurer</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} xs={12} style={{ marginBottom: "1rem" }}>
          <Card style={{ border: "4px solid #c0392b", textAlign: "center" }}>
            <Card.Img variant="top" src={ianImg} style={{ maxWidth: "100%", height: "auto" }} />
            <Card.Body style={{ backgroundColor: "#ffffff", color: "#2c3e50" }}>
              <Card.Title style={{ color: "#c0392b" }}>Ian</Card.Title>
              <Card.Text>Secretary</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Gym Info Section */}
      <h2 style={{ color: "#f5f5f5" }}>Boulder’s Climbing Gym</h2>
      <Card style={{ marginBottom: "1rem", border: "4px solid #2980b9" }}>
        <Card.Body style={{ backgroundColor: "#ffffff", color: "#2c3e50" }}>
          <Card.Title style={{ color: "#2980b9" }}>
            <FaInfoCircle style={{ marginRight: "8px" }} />
            Boulder’s Gym Details
          </Card.Title>
          <Card.Text>
            Address: 129 S Carroll St, Madison, WI 53703 <br />
            <br />
            You’ll need to purchase a pass from Boulder’s to climb. Options include:
          </Card.Text>
          <ul>
            <li>Day Pass</li>
            <li>10‑Punch Pass</li>
            <li>Monthly Membership</li>
          </ul>
          <Button
            variant="primary"
            style={{ fontWeight: "bold", boxShadow: "0 4px 8px rgba(0,0,0,0.3)" }}
            href="https://www.bouldersgym.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Boulder’s Website
          </Button>

          {/* Google Maps Embed */}
          <div style={{ marginTop: "1rem" }}>
            <iframe
              title="Boulder's Climbing Gym Map"
              src="https://www.google.com/maps?q=129%20S%20Carroll%20St,%20Madison,%20WI%2053703&output=embed"
              width="100%"
              height="300"
              style={{ border: "2px solid #2980b9", borderRadius: "8px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AboutUs;