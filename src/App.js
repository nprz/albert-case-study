import React from "react";

// Components
import ToggleButton from "./components/ToggleButton";

// Style
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    height: "calc(100vh - 2px)",
    width: "calc(100vw - 2px)",
    border: "1px solid black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  }
});

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ToggleButton />
    </div>
  );
}

export default App;
