import React from "react";
import axios from "axios";
// Suggested initial states
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at
const initialCoordinates = { x: 2, y: 2 };

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
  coordinates: initialCoordinates,
};

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  constructor() {
    super();
    this.state = initialState;
  }

  reset = () => {
    // Use this helper to reset all states to their initial values.
    this.setState(initialState);
  };

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    const { index } = this.state;

    if (index < 3 && direction === "up") {
      this.setState({ ...this.state, message: "You can't go up" });
    } else if (index > 5 && direction === "down") {
      this.setState({ ...this.state, message: "You can't go down" });
    } else if (
      (index === 2 && direction === "right") ||
      (index === 5 && direction === "right") ||
      (index === 8 && direction === "right")
    ) {
      this.setState({ ...this.state, message: "You can't go right" });
    } else if (
      (index === 0 && direction === "left") ||
      (index === 3 && direction === "left") ||
      (index === 6 && direction === "left")
    ) {
      this.setState({ ...this.state, message: "You can't go left" });
    } else {
      this.move(direction);
    }
  };

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    let stepIncrease = this.state.steps + 1;
    if (evt === "up" || evt === "down") {
      let upOrDown = evt === "up" ? this.state.index - 3 : this.state.index + 3;

      let coordinatesUpOrDown =
        evt === "up"
          ? this.state.coordinates.y - 1
          : this.state.coordinates.y + 1;

      this.setState({
        ...this.state,
        index: upOrDown,
        coordinates: { x: this.state.coordinates.x, y: coordinatesUpOrDown },
        message: initialMessage,
        steps: stepIncrease,
      });
    } else {
      let leftOrRight =
        evt === "left" ? this.state.index - 1 : this.state.index + 1;

      let coordinatesLeftOrRight =
        evt === "left"
          ? this.state.coordinates.x - 1
          : this.state.coordinates.x + 1;

      this.setState({
        ...this.state,
        index: leftOrRight,
        coordinates: { x: coordinatesLeftOrRight, y: this.state.coordinates.y },
        message: initialMessage,
        steps: stepIncrease,
      });
    }
  };

  onChange = (evt) => {
    // You will need this to update the value of the input.
    const { value } = evt.target;
    this.setState({ ...this.state, email: value });
  };

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    const data = {
      x: this.state.coordinates.x,
      y: this.state.coordinates.y,
      steps: this.state.steps,
      email: this.state.email,
    };
    axios
      .post(`http://localhost:9000/api/result`, data)
      .then((res) => {
        this.setState({ ...this.state, message: res.data.message, email: "" });
      })
      .catch((err) => {
        this.setState({ ...this.state, message: err.response.data.message });
      });
  };
  render() {
    const { className } = this.props;
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">
            Coordinates ({this.state.coordinates.x}, {this.state.coordinates.y})
          </h3>
          <h3 id="steps">
            You moved {this.state.steps}{" "}
            {this.state.steps === 1 ? "time" : "times"}
          </h3>
        </div>
        <div id="grid">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
            <div
              key={idx}
              className={`square${idx === this.state.index ? " active" : ""}`}
            >
              {idx === this.state.index ? "B" : null}
            </div>
          ))}
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick={() => this.getNextIndex("left")} id="left">
            LEFT
          </button>
          <button onClick={() => this.getNextIndex("up")} id="up">
            UP
          </button>
          <button onClick={() => this.getNextIndex("right")} id="right">
            RIGHT
          </button>
          <button onClick={() => this.getNextIndex("down")} id="down">
            DOWN
          </button>
          <button onClick={() => this.reset()} id="reset">
            reset
          </button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            onChange={this.onChange}
            id="email"
            type="email"
            placeholder="type email"
            value={this.state.email}
          ></input>
          <input data-testid="submit-button" id="submit" type="submit"></input>
        </form>
      </div>
    );
  }
}
