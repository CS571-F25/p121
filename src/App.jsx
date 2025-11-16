import { HashRouter, Routes, Route } from "react-router";
import Navbar from "./nav/Navbar";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import InstaPage from "./pages/InstaPage";
import Voting from "./pages/Voting";

export default function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/insta" element={<InstaPage />} />
        <Route path="/vote" element={<Voting />} />
      </Routes>
    </HashRouter>
  );
}

//cd C:\Users\kamch\ClimbingClubSite\p0-project