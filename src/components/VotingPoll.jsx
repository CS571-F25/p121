import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  onSnapshot
} from "firebase/firestore";

export default function VotingPoll({ pollId }) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [votes, setVotes] = useState({});
  const [hasVoted, setHasVoted] = useState(false);

  // Check if user already voted in this session
  useEffect(() => {
    const voted = sessionStorage.getItem(`voted-${pollId}`);
    setHasVoted(!!voted);
  }, [pollId]);

  // Listen for poll metadata (question + options)
  useEffect(() => {
    const unsubscribeMeta = onSnapshot(doc(db, "pollsMeta", pollId), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setQuestion(data.question || "");
        setOptions(data.options || []);
      }
    });
    return () => unsubscribeMeta();
  }, [pollId]);

  // Listen for votes
  useEffect(() => {
    const unsubscribeVotes = onSnapshot(doc(db, "polls", pollId), (docSnap) => {
      if (docSnap.exists()) {
        setVotes(docSnap.data());
      } else {
        setVotes({});
      }
    });
    return () => unsubscribeVotes();
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
    } catch (err) {
      console.error("Vote failed:", err);
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

      <div style={{ marginBottom: "1rem" }}>
        {options.map((opt) => (
          <Button
            key={opt}
            variant="primary"
            style={{ margin: "0.5rem" }}
            onClick={() => handleVote(opt)}
            disabled={hasVoted} // disable if already voted
          >
            {opt}
          </Button>
        ))}
      </div>

      {hasVoted && (
        <p style={{ fontStyle: "italic", color: "gray" }}>
          You’ve already voted in this poll.
        </p>
      )}

      {Object.keys(votes).length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h4>Top Responses:</h4>
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