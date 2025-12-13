import React, { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";
import AdminCalendar from "../components/AdminCalendar";
import VotingPollManager from "../components/VotingPollManager";
import ResetVotes from "../components/ResetVotes";
import { Card, Button, Form } from "react-bootstrap";

const ADMIN_UID = "PDHfWcnRRrduIno7y3T96EPCKEF3";

export default function Admin() {
  const [selectedTool, setSelectedTool] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (result.user.uid === ADMIN_UID) {
        setUser(result.user);
      } else {
        alert("Not authorized");
      }
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setSelectedTool(null);
  };

  return (
    <div style={{ backgroundColor: "#1c1c1c", minHeight: "100vh", padding: "2rem" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ color: "#f5f5f5" }}>Admin Dashboard</h1>
      </div>

      {!user ? (
        <Card style={{ maxWidth: "400px", margin: "0 auto", padding: "1.5rem" }}>
          <Card.Body>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Admin email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              style={{ marginTop: "1rem", width: "100%" }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <>
          {!selectedTool ? (
            <Card style={{ maxWidth: "600px", margin: "0 auto", padding: "1.5rem" }}>
              <Card.Body style={{ textAlign: "center" }}>
                <h2>Choose what to manage:</h2>
                <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
                  <Button variant="info" onClick={() => setSelectedTool("calendar")}>
                    📅 Manage Calendar
                  </Button>
                  <Button variant="warning" onClick={() => setSelectedTool("polls")}>
                    🗳️ Manage Polls
                  </Button>
                  <Button variant="danger" onClick={() => setSelectedTool("resetVotes")}>
                    🔄 Reset Votes
                  </Button>
                </div>
                <Button
                  variant="secondary"
                  style={{ marginTop: "1rem" }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Card.Body>
            </Card>
          ) : (
            <Card style={{ maxWidth: "900px", margin: "2rem auto", padding: "1.5rem" }}>
              <Card.Body>
                <Button variant="secondary" style={{ marginBottom: "1rem" }} onClick={() => setSelectedTool(null)}>
                  ⬅ Back to Dashboard
                </Button>
                {selectedTool === "calendar" && <AdminCalendar />}
                {selectedTool === "polls" && <VotingPollManager />}
                {selectedTool === "resetVotes" && <ResetVotes />}
              </Card.Body>
            </Card>
          )}
        </>
      )}
    </div>
  );
}