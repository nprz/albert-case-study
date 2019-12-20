import React from "react";

// Style
import { makeStyles } from "@material-ui/core/Styles";

const useStyles = makeStyles({
  root: {}
});

export default function SearchResults({ searchResults }) {
  const classes = useStyles();
  // NEXT STEPS: Pull info to display from results into object
  // write function to iterate thru cards
  console.log({ searchResults });
  return <div className={classes.root}>I am the search results component.</div>;
}
