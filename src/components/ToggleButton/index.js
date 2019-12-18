import { connect } from "react-redux";
import ToggleButton from "./ToggleButton";
import { toggle } from "redux/actionCreators/toggle";

const mapStateToProps = state => ({
  toggleValue: state.toggle
});

const mapDispatchToProps = dispatch => ({
  handleClick: () => dispatch(toggle())
});

export default connect(mapStateToProps, mapDispatchToProps)(ToggleButton);
