import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

// Icons
import { FaInstagram, FaVoteYea, FaCalendarAlt, FaInfoCircle } from "react-icons/fa";

// Local background image
import climbingImg from "../assets/images/climbingClubPic.jpg";

// Reusable card
import HomeCard from "../components/HomeCard";

function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "events"), (snapshot) => {
      const fetchedEvents = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const sorted = fetchedEvents
        .filter((ev) => ev.start)
        .sort((a, b) => new Date(a.start) - new Date(b.start))
        .slice(0, 3);

      setEvents(sorted);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${climbingImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        position: "relative",
        color: "white",
      }}
    >
      {/* Overlay for contrast */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", padding: "2rem" }}>
        {/* Hero Section */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1>Climbing Club UW</h1>
          <p>Community • Adventure • Fun</p>
        </div>

        {/* About Section */}
        <h2>About the Club</h2>
        <HomeCard
          icon={<FaInfoCircle />}
          title="About Us"
          text="Learn about our club meetings, Boulder’s info, and how to get involved."
          buttonLabel="Learn More"
          buttonVariant="light"
          buttonLink="/about"
        />

        {/* Instagram Section */}
        <h2>Stay Connected</h2>
        <HomeCard
          icon={<FaInstagram />}
          title="Instagram"
          text="See our latest photos and updates from the climbing community."
          buttonLabel="See Photos"
          buttonVariant="success"
          buttonLink="/insta"
        />

        {/* Voting Section */}
        <h2>Get Involved</h2>
        <HomeCard
          icon={<FaVoteYea />}
          title="Voting"
          text="Participate in fun polls and see what fellow climbers think."
          buttonLabel="Vote Now"
          buttonVariant="warning"
          buttonLink="/vote"
        />

        {/* Upcoming Events Section */}
        <h2>Upcoming Events</h2>
        {events.length === 0 ? (
          <p>No upcoming events found.</p>
        ) : (
          events.map((ev) => (
            <HomeCard
              key={ev.id}
              icon={<FaCalendarAlt />}
              title={ev.title}
              text={`${new Date(ev.start).toLocaleString()} ${
                ev.end ? `– ${new Date(ev.end).toLocaleString()}` : ""
              }`}
              buttonLabel="View Calendar"
              buttonVariant="info"
              buttonLink="/schedule"
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Home;