import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import VotingPoll from "../components/VotingPoll";
import { Card } from "react-bootstrap";

function Voting() {
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

  return (
    <div style={{ backgroundColor: "#1c1c1c", minHeight: "100vh", padding: "2rem" }}>
      {/* Hero Section */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ color: "#f5f5f5", marginBottom: "1rem" }}>Voting</h1>
        <p style={{ color: "#ddd", maxWidth: "700px", margin: "0 auto" }}>
          This page is just for fun! Below you can find some lighthearted topics to vote on and
          see what fellow members and climbers think. Cast your vote and check out the top replies!
        </p>
      </div>

      {/* Polls Section */}
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {polls.map((poll) => (
          <Card
            key={poll.id}
            style={{
              marginBottom: "2rem",
              border: "2px solid #2980b9",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
              backgroundColor: "#ffffff",
              padding: "1rem",
            }}
          >
            <VotingPoll pollId={poll.id} />
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Voting;