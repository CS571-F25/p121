import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, setDoc, collection, onSnapshot } from "firebase/firestore";
import { Card, Button, ListGroup } from "react-bootstrap";

export default function ResetVotes() {
  const [polls, setPolls] = useState([]);

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

  const handleReset = async (pollId) => {
    try {
      await setDoc(doc(db, "polls", pollId), {}); // clears votes
      alert(`Votes for "${pollId}" have been reset.`);
    } catch (err) {
      console.error("Failed to reset votes:", err);
    }
  };

  return (
    <div style={{ backgroundColor: "#1c1c1c", minHeight: "100vh", padding: "2rem" }}>
      <Card
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          border: "4px solid #c0392b",
          boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
        }}
      >
        <Card.Body>
          <h2 style={{ color: "#c0392b", textAlign: "center", marginBottom: "1rem" }}>
            Reset Votes
          </h2>
          <p style={{ color: "#000000ff", textAlign: "center" }}>
            Use this interface to reset votes for existing polls. Click the button next to a poll to clear its votes.
          </p>

          {polls.length === 0 ? (
            <p style={{ textAlign: "center", color: "#888" }}>No polls found.</p>
          ) : (
            <ListGroup variant="flush">
              {polls.map((poll) => (
                <ListGroup.Item
                  key={poll.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <strong>{poll.question}</strong>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleReset(poll.id)}
                    style={{ fontWeight: "bold" }}
                  >
                    🔄 Reset Votes
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}