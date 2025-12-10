import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import AdminCalendar from "../components/AdminCalendar";
import VotingPollManager from "../components/VotingPollManager";
import ResetVotes from "../components/ResetVotes";
import { Card, Button, Form } from "react-bootstrap";

export default function Admin() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [storedPassword, setStoredPassword] = useState(null);
  const [selectedTool, setSelectedTool] = useState(null);

  useEffect(() => {
    const fetchPassword = async () => {
      const docRef = doc(db, "adminConfig", "settings");
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setStoredPassword(snap.data().password);
      }
    };
    fetchPassword();
  }, []);

  const handleUnlock = () => {
    if (password === storedPassword) {
      setUnlocked(true);
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <div style={{ backgroundColor: "#1c1c1c", minHeight: "100vh", padding: "2rem" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ color: "#f5f5f5" }}>Admin Dashboard</h1>
      </div>

      {!unlocked ? (
        <Card style={{ maxWidth: "400px", margin: "0 auto", padding: "1.5rem", border: "4px solid #c62020ff", borderRadius: "8px" }}>
          <Card.Body>
            <Form.Group>
              <Form.Label>Enter Admin Password</Form.Label>
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
              onClick={handleUnlock}
            >
              Unlock
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <>
          {!selectedTool ? (
            <Card style={{ maxWidth: "600px", margin: "0 auto", padding: "1.5rem", border: "4px solid #c62020ff", borderRadius: "8px" }}>
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