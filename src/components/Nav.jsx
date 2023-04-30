import React from "react";
import TextBox from "./TextBox";

function Nav({ canvas, showModal, setShowModal }) {
  return (
    <>
      <div className="container">
        <nav className="navbar">
          <figure className="logo__wrapper">
            {canvas} {/*Displays 3D logo */}
            <h1 className="logo__title">
              <span className="logo__title--green">Green</span> World
            </h1>
          </figure>
          <div className="navbar__right">
            <button onClick={() => setShowModal(!showModal)} id="about">
              About
            </button>
          </div>
        </nav>
        <TextBox />
      </div>
    </>
  );
}

export default Nav;
