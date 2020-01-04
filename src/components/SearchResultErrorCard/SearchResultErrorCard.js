import React from "react";
import PropTypes from "prop-types";

// Components
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

// Style
import { makeStyles } from "@material-ui/core/Styles";

const useStyles = makeStyles(theme => {
  return {
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"
    },
    button: {
      marginTop: 16
    }
  };
});

export default function SearchResultErrorCard({
  fetchSearchResults,
  query,
  category,
  page
}) {
  const classes = useStyles();

  return (
    <Card>
      <CardContent className={classes.root}>
        <Typography variant="h6">
          Sorry! We were unable to process your request for <b>"{query}"</b>
        </Typography>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => fetchSearchResults(query, category, page)}
        >
          Retry?
        </Button>
      </CardContent>
    </Card>
  );
}

SearchResultErrorCard.propTypes = {
  fetchSearchResults: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired
};
