import React, { useState } from "react";
import axios from "axios";
// Suggested initial states
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [email, setEmail] = useState("");

  function getXY(pastIndex) {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    let index = pastIndex;
    return index;
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    console.log("resetting");
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    if (direction === "up") {
      console.log("up");
    }
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    const { value } = evt.target;
    setEmail(value);
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    console.log(email);
    return axios
      .post(`http://localhost:9000/api/result`, {
        x: 2,
        y: 2,
        steps: 0,
        email: email,
      })
      .then((res) => {
        console.log(res.data.message);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates (2, 2)</h3>
        <h3 id="steps">You moved 0 times</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div
            key={idx}
            className={`square${idx === initialIndex ? " active" : ""}`}
          >
            {idx === initialIndex ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message"></h3>
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
