import React from "react";
import PropTypes from "prop-types";

const ToggleButton = ({ toggleValue, handleClick }) => {
  return (
    <>
      <button onClick={handleClick}>please click me</button>
      <div>button value: {toggleValue.toString()}</div>
    </>
  );
};

ToggleButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  toggleValue: PropTypes.bool.isRequired
};

export default ToggleButton;
