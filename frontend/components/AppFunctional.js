import React, { useState } from "react";
import axios from "axios";
// Suggested initial states
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at
const initialCoordinates = { x: 2, y: 2 };
export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [email, setEmail] = useState(initialEmail);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [steps, setSteps] = useState(initialSteps);
  const [message, setMessage] = useState(initialMessage);
  const [coordinates, setCoordinates] = useState(initialCoordinates);

  function reset() {
    // Use this helper to reset all states to their initial values.
    setCurrentIndex(initialIndex);
    setMessage(initialMessage);
    setSteps(initialSteps);
    setCoordinates(initialCoordinates);
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    if (currentIndex < 3 && direction === "up") {
      setMessage("You can't go up");
    } else if (currentIndex > 5 && direction === "down") {
      setMessage("You can't go down");
    } else if (
      (currentIndex === 2 && direction === "right") ||
      (currentIndex === 5 && direction === "right") ||
      (currentIndex === 8 && direction === "right")
    ) {
      setMessage("You can't go right");
    } else if (
      (currentIndex === 0 && direction === "left") ||
      (currentIndex === 3 && direction === "left") ||
      (currentIndex === 6 && direction === "left")
    ) {
      setMessage("You can't go left");
    } else {
      setMessage(initialMessage);
      move(direction);
      let stepIncrease = steps + 1;
      setSteps(stepIncrease);
    }
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    if (evt === "up" || evt === "down") {
      let upOrDown = evt === "up" ? currentIndex - 3 : currentIndex + 3;
      let coordinatesUpOrDown =
        evt === "up" ? coordinates.y - 1 : coordinates.y + 1;
      setCoordinates({ ...coordinates, y: coordinatesUpOrDown });
      setCurrentIndex(upOrDown);
    } else {
      let leftOrRight = evt === "left" ? currentIndex - 1 : currentIndex + 1;
      setCurrentIndex(leftOrRight);
      let coordinatesLeftOrRight =
        evt === "left" ? coordinates.x - 1 : coordinates.x + 1;
      setCoordinates({ ...coordinates, x: coordinatesLeftOrRight });
    }
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    const { value } = evt.target;
    setEmail(value);
  }

  async function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    console.log(email);
    try {
      const res = await axios.post(`http://localhost:9000/api/result`, {
        x: coordinates.x,
        y: coordinates.y,
        steps: steps,
        email: email,
      });
      setMessage(res.data.message);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">
          Coordinates ({coordinates.x},{coordinates.y})
        </h3>
        <h3 id="steps">You moved {steps} times</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div
            key={idx}
            className={`square${idx === currentIndex ? " active" : ""}`}
          >
            {idx === currentIndex ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button onClick={() => getNextIndex("left")} id="left">
          LEFT
        </button>
        <button onClick={() => getNextIndex("up")} id="up">
          UP
        </button>
        <button onClick={() => getNextIndex("right")} id="right">
          RIGHT
        </button>
        <button onClick={() => getNextIndex("down")} id="down">
          DOWN
        </button>
        <button onClick={() => reset()} id="reset">
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          id="email"
          type="email"
          placeholder="type email"
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
