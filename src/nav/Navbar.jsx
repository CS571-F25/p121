import { Link } from "react-router";

export default function Navbar() {
  return (
    <nav style={{
      width: "100%",
      backgroundColor: "#333",
      padding: "1rem",
      display: "flex",
      gap: "2rem",
      color: "white"
    }}>
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
      <Link to="/about" style={{ color: "white", textDecoration: "none" }}>About Us</Link>
      <Link to="/insta" style={{ color: "white", textDecoration: "none" }}>Instagram</Link>
      <Link to="/vote" style={{ color: "white", textDecoration: "none" }}>Voting</Link>
      <Link to="/schedule" style={{ color: "white", textDecoration: "none" }}>Schedule</Link>
      <Link to="/admin" style={{ color: "white", textDecoration: "none" }}>Admin</Link>
    </nav>
  );
}
