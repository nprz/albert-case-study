import React from "react";

// Components
import SearchInput from "components/SearchInput";

// Style
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    height: "calc(100vh - 32px)",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    marginTop: 32
  },
  pageLayout: {
    width: 800,
    minWidth: 0,
    margin: "0px auto",
    padding: "0px 32px",
    display: "flex",
    justifyContent: "center",
    position: "relative"
  }
});

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.pageLayout}>
        <SearchInput />
      </div>
    </div>
  );
}

export default App;
