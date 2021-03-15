import React from "react";

const Houses = ({ houses }) => {
  return (
    <div>
      <h1>These Are The Houses With Their Respective Students</h1>
      {houses.map((house, id) => {
        return (
          <div key={id}>
            <h1>{house.name}</h1>
            <h2>These Are The Students Of House {house.name}</h2>
            <ul>
              {house.characters.map((character, id) => (
                <li key={id}>
                  {character.name}
                  <button>x</button>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Houses;
