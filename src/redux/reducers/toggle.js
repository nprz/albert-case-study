import { TOGGLE } from "redux/actions/toggle";

const toggle = (state = false, action) => {
  // believe state here just refers to the portion of the
  // state this reducer handles and not the entire existing state.
  switch (action.type) {
    case TOGGLE:
      return !state;
    default:
      return state;
  }
};

export default toggle;
