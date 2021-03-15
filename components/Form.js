import React from "react";

const Form = ({ houses }) => {
  return (
    <form>
      <div>
        <label>Which House Do You Want To Join? </label>
        <select>
          {houses.map((house, id) => {
            return (
              <option value={house.name.toLowerCase()} key={id}>
                {house.name}
              </option>
            );
          })}
        </select>
      </div>
      <br></br>
      <div>
        <label>Names Of Student </label>
        <input type="text"></input>
      </div>
      <br></br>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
