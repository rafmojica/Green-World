import React from "react";

function List({ img, name }) {
  return (
    <>
      <li className="modal__list--item">
        <img className="modal__list--img" src={img} /> {name}
      </li>
    </>
  );
}

export default List;
