import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  onSnapshot
} from "firebase/firestore";

export default function VotingPoll({ pollId, question, options, includeOther = false }) {
  const [otherInput, setOtherInput] = useState("");
  const [votes, setVotes] = useState({});
  const [hasVoted, setHasVoted] = useState(false);

  // Check sessionStorage on mount
  useEffect(() => {
    const voted = sessionStorage.getItem(`voted-${pollId}`);
    setHasVoted(!!voted);
  }, [pollId]);

  // Listen for vote updates
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "polls", pollId), (docSnap) => {
      if (docSnap.exists()) {
        setVotes(docSnap.data());
      }
    });
    return () => unsubscribe();
  }, [pollId]);

  const handleVote = async (choice) => {
    if (hasVoted) return;

    const key = choice.trim();
    const pollRef = doc(db, "polls", pollId);

    try {
      const docSnap = await getDoc(pollRef);
      if (!docSnap.exists()) {
        await setDoc(pollRef, { [key]: 1 });
      } else {
        await updateDoc(pollRef, { [key]: increment(1) });
      }
      sessionStorage.setItem(`voted-${pollId}`, "true");
      setHasVoted(true);
      setOtherInput("");
    } catch (err) {
      console.error("Vote failed:", err);
    }
  };

  const handleOtherSubmit = () => {
    if (otherInput.trim()) {
      handleVote(otherInput);
    }
  };

  const getTopVotes = () => {
    return Object.entries(votes)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <h2>{question}</h2>

      {!hasVoted ? (
        <>
          <div style={{ marginBottom: "1rem" }}>
            {options.map((opt) => (
              <Button
                key={opt}
                variant="primary"
                style={{ margin: "0.5rem" }}
                onClick={() => handleVote(opt)}
              >
                {opt}
              </Button>
            ))}
          </div>

          {includeOther && (
            <Form.Group controlId="otherInput" style={{ maxWidth: "300px" }}>
              <Form.Label>Other:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your own answer"
                value={otherInput}
                onChange={(e) => setOtherInput(e.target.value)}
              />
              <Button
                variant="secondary"
                style={{ marginTop: "0.5rem" }}
                onClick={handleOtherSubmit}
              >
                Submit
              </Button>
            </Form.Group>
          )}
        </>
      ) : (
        <p style={{ fontStyle: "italic", color: "gray" }}>
          You’ve already voted in this poll.
        </p>
      )}

      {Object.keys(votes).length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h4>Top 3 Responses:</h4>
          <ol>
            {getTopVotes().map(([option, count]) => (
              <li key={option}>
                {option} — {count} vote{count !== 1 ? "s" : ""}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
