import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, setDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { Card, Button, Form, ListGroup } from "react-bootstrap";

export default function VotingPollManager() {
  const [polls, setPolls] = useState([]);
  const [newPollId, setNewPollId] = useState("");
  const [newQuestion, setNewQuestion] = useState("");
  const [newOptions, setNewOptions] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "pollsMeta"), (snapshot) => {
      const fetchedPolls = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPolls(fetchedPolls);
    });
    return () => unsubscribe();
  }, []);

  const handleAddPoll = async () => {
    if (!newPollId || !newQuestion || !newOptions) return;
    try {
      await setDoc(doc(db, "pollsMeta", newPollId), {
        question: newQuestion,
        options: newOptions.split(",").map((opt) => opt.trim()),
      });
      await setDoc(doc(db, "polls", newPollId), {}); // initialize votes doc
      setNewPollId("");
      setNewQuestion("");
      setNewOptions("");
    } catch (err) {
      console.error("Failed to add poll:", err);
    }
  };

  const handleDeletePoll = async (pollId) => {
    try {
      await deleteDoc(doc(db, "pollsMeta", pollId));
      await deleteDoc(doc(db, "polls", pollId));
    } catch (err) {
      console.error("Failed to delete poll:", err);
    }
  };

  return (
    <div style={{ backgroundColor: "#1c1c1c", minHeight: "100vh", padding: "2rem" }}>
      <Card
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          border: "2px solid #27ae60",
          boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
        }}
      >
        <Card.Body>
          <h2 style={{ color: "#27ae60", textAlign: "center", marginBottom: "1rem" }}>
            Manage Polls
          </h2>
          <p style={{ color: "#555", textAlign: "center" }}>
            Add, view, and delete voting polls. Make sure the Poll ID is unique and the options are comma‑separated.
          </p>

          {/* Add Poll Form */}
          <Form style={{ marginBottom: "1.5rem" }}>
            <Form.Group className="mb-2">
              <Form.Control
                type="text"
                placeholder="Poll ID"
                value={newPollId}
                onChange={(e) => setNewPollId(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control
                type="text"
                placeholder="Poll Question"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control
                type="text"
                placeholder="Options (comma separated)"
                value={newOptions}
                onChange={(e) => setNewOptions(e.target.value)}
              />
            </Form.Group>
            <Button variant="success" onClick={handleAddPoll} style={{ width: "100%", fontWeight: "bold" }}>
              ➕ Add Poll
            </Button>
          </Form>

          {/* Existing Polls */}
          <h3 style={{ marginTop: "1rem", marginBottom: "1rem" }}>Existing Polls</h3>
          {polls.length === 0 ? (
            <p style={{ textAlign: "center", color: "#888" }}>No polls found.</p>
          ) : (
            <ListGroup variant="flush">
              {polls.map((poll) => (
                <ListGroup.Item
                  key={poll.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  <strong>Question: {poll.question}</strong>
                  <span>Options: {poll.options.join(", ")}</span>
                  <span style={{ fontSize: "0.9rem", color: "#666" }}>Poll ID: {poll.id}</span>
                  <div style={{ textAlign: "right" }}>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeletePoll(poll.id)}
                      style={{ fontWeight: "bold" }}
                    >
                      🗑️ Delete
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}