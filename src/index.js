import React, { Component } from "react";
import { render } from "react-dom";
import axios from "axios";
import Form from "../components/Form";
import Houses from "../components/Houses";

class App extends Component {
  constructor() {
    super();
    this.state = { houses: [] };
  }

  async componentDidMount() {
    this.setState({
      houses: (await axios.get("/api/houses")).data,
    });
  }

  render() {
    const { houses } = this.state;
    return (
      <div>
        <Form houses={houses} />
        <br></br>
        <Houses houses={houses} />
      </div>
    );
  }
}

render(<App />, document.querySelector("#root"));
