import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { db } from "../firebase";
import { collection, addDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { Card, Button, Form, ListGroup } from "react-bootstrap";

export default function AdminCalendar() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  // Load events from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "events"), (snapshot) => {
      const fetchedEvents = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(fetchedEvents);
    });
    return () => unsubscribe();
  }, []);

  // Add new event
  const handleAddEvent = async () => {
    if (!title || !start) return;
    try {
      await addDoc(collection(db, "events"), {
        title,
        start,
        end: end || start,
      });
      setTitle("");
      setStart("");
      setEnd("");
    } catch (err) {
      console.error("Failed to add event:", err);
    }
  };

  // Delete event
  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteDoc(doc(db, "events", eventId));
    } catch (err) {
      console.error("Failed to delete event:", err);
    }
  };

  return (
    <div style={{ backgroundColor: "#1c1c1c", minHeight: "100vh", padding: "2rem" }}>
      <Card
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          border: "4px solid #2980b9",
          boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
        }}
      >
        <Card.Body>
          <h1 style={{ color: "#2980b9", textAlign: "center", marginBottom: "1rem" }}>
            Admin Calendar
          </h1>
          <p style={{ color: "#000000ff", textAlign: "center" }}>
            Add, view, and delete calendar events. Enter the title and start/end dates to add an event.
          </p>

          {/* Add Event Form */}
          <Form style={{ marginBottom: "1.5rem" }}>
            <Form.Group className="mb-2" controlId="eventTitle">
              <Form.Label>Event Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="eventStart">
              <Form.Label>Start Date/Time</Form.Label>
              <Form.Control
                type="datetime-local"
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="eventEnd">
              <Form.Label>End Date/Time</Form.Label>
              <Form.Control
                type="datetime-local"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
              />
            </Form.Group>
            <Button variant="success" onClick={handleAddEvent}>
              ➕ Add Event
            </Button>
          </Form>


          {/* Calendar */}
          <Card style={{ marginBottom: "1.5rem", border: "1px solid #ddd" }}>
            <Card.Body>
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="dayGridMonth"
                events={events}
                height="70vh"
                editable={false}
                selectable={false}
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
              />
            </Card.Body>
          </Card>

          {/* Delete Event List */}
          <h3 style={{ marginTop: "1rem" }}>Delete Events</h3>
          <p style={{ color: "#555" }}>
            Click the delete button next to an event to remove it from the calendar.
          </p>
          {events.length === 0 ? (
            <p style={{ textAlign: "center", color: "#888" }}>No events found.</p>
          ) : (
            <ListGroup variant="flush">
              {events.map((ev) => (
                <ListGroup.Item
                  key={ev.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>
                    <strong>{ev.title}</strong> — {new Date(ev.start).toLocaleString()}
                  </span>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteEvent(ev.id)}
                    style={{ fontWeight: "bold" }}
                  >
                    🗑️ Delete
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