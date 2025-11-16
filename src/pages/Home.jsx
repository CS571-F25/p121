import React, { useEffect } from "react";
import { Button } from "react-bootstrap";

function Home() {

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the Climbing Club UW website! This is a just a fun little website for members of the club, or anyone really,
        to mess around with and provide some useful and basic information about the club and climbing in general. Please feel
        free to navigate around the website and check out what each page has to offer! Some pages will be actually useful for
        climbing club info, while some of the pages are really just for fun. Below are some quick descriptions of each page:
      </p>
      <ul>
        <li><strong>About Us</strong> - Basic info on the club such as meeting info and more about Boulder's</li>
        <li><strong>Instagram</strong> - Check out our latest photos and updates from the club</li>
        <li><strong>Voting</strong> - Participate in fun little polls about climbing or random topics</li>
      </ul>
    </div>
  );
}

export default Home;
