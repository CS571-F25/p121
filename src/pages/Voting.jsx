import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import VotingPoll from '../components/VotingPoll';

function Voting() {

  return (
    <div>
      <h1>Voting</h1>
      <p>This page is really just for fun! Below you can find some fun topics to vote on and see what
        some of the top replies from fellow members/climbers are.
      </p>

      <VotingPoll
        question="What is your favorite type of hold?"
        pollId="fav-hold"
        options={["Crimp", "Sloper", "Jug", "Pinch", "Pocket"]}
      />

      <VotingPoll
        question="What's your favorite climbing style?"
        pollId="fav-style"
        options={["Bouldering", "Sport", "Trad", "Top-rope"]}
      />

    </div>
  );
}

export default Voting;
