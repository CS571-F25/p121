import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { Card } from "react-bootstrap";

export default function Schedule() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "events"), (snapshot) => {
      const fetchedEvents = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          start: data.start,
          end: data.end || data.start,
        };
      });
      setEvents(fetchedEvents);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ backgroundColor: "#1c1c1c", minHeight: "100vh", padding: "2rem" }}>
      {/* Hero Section */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ color: "#f5f5f5", marginBottom: "1rem" }}>Club Calendar</h1>
        <p style={{ color: "#ffffffff", maxWidth: "700px", margin: "0 auto" }}>
          Below is the club's event schedule. Stay up to date with all upcoming climbs,
          meetings, and social events!
        </p>
      </div>

      {/* Calendar Container */}
      <Card
        style={{
          border: "4px solid #2980b9",
          borderRadius: "8px",
          backgroundColor: "#ffffff",
          padding: "1rem",
          maxWidth: "1000px",
          margin: "0 auto",
          boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
        }}
      >
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          height="80vh"
          editable={false}
          selectable={false}
          eventStartEditable={false}
          eventDurationEditable={false}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
        />
      </Card>
    </div>
  );
}