import React, { Component } from "react";
import { render } from "react-dom";
import axios from "axios";
import Form from "../components/Form";
import Houses from "../components/Houses";

//Default houseId added for now.

class App extends Component {
  constructor() {
    super();
    this.state = {
      houses: [],
      name: "",
      characters: [],
      houseId: "",
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.changeHouseId = this.changeHouseId.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
  }

  async componentDidMount() {
    this.setState({
      houses: (await axios.get("/api/houses")).data,
      characters: (await axios.get("/api/characters")).data,
    });
  }

  changeHandler(event) {
    const name = event.target.value;
    this.setState({
      name,
    });
  }

  changeHouseId(event) {
    const houseId = event.target.value;
    this.setState({
      houseId,
    });
  }

  async deleteHandler(event) {
    const deleteThisCharacterId = event.target.value;
    const singleCharacter = (
      await axios.get(`/api/characters/${deleteThisCharacterId}`)
    ).data;

    await axios.delete(`/api/characters/${deleteThisCharacterId}`);
    this.setState({
      houses: (await axios.get("/api/houses")).data,
    });

    window.alert(`${singleCharacter.name} has been declared dead!`);
  }

  async submitHandler(event) {
    event.preventDefault();
    if (this.state.houseId === "") {
      alert("BRUH, PICK A HOUSE MATE");
    } else {
      (
        await axios.post("/api/characters", {
          name: this.state.name,
          houseId: this.state.houseId,
        })
      ).data;

      window.location.reload();
    }
  }

  render() {
    const { houses } = this.state;
    return (
      <div>
        <Form
          houses={houses}
          changeHandler={this.changeHandler}
          submitHandler={this.submitHandler}
          changeHouseId={this.changeHouseId}
        />
        <br></br>
        <Houses houses={houses} deleteHandler={this.deleteHandler} />
      </div>
    );
  }
}

render(<App />, document.querySelector("#root"));
