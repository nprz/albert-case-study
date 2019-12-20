import React, { useState } from "react";

// Components
import SearchInput from "components/SearchInput";
import SearchResults from "components/SearchResults";

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
    padding: "0px 32px"
  }
});

function App() {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className={classes.root}>
      <div className={classes.pageLayout}>
        <SearchInput
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <SearchResults searchValue={searchValue} />
      </div>
    </div>
  );
}

export default App;
