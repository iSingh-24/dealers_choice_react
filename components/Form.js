import React from "react";

const Form = ({
  houses,
  changeHandler,
  submitHandler,
  houseId,
  changeHouseId,
}) => {
  return (
    <form onSubmit={submitHandler}>
      <div>
        <label>Which House Do You Want To Join? </label>
        <select value={houseId} onChange={changeHouseId}>
          <option value="">Please Select A House</option>
          {houses.map((house, id) => {
            return (
              <option value={house.id} key={id}>
                {house.name}
              </option>
            );
          })}
        </select>
      </div>
      <br></br>
      <div>
        <label>Names Of Student </label>
        <input type="text" onChange={changeHandler}></input>
      </div>
      <br></br>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
