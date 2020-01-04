import React from "react";
import PropTypes from "prop-types";

// Components
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

// Helpers
import { transparentize } from "polished";

// Style
import { makeStyles } from "@material-ui/core/Styles";

const useStyles = makeStyles(theme => {
  return {
    root: {
      marginBottom: 16,
      width: "100%",
      transition: "background-color .2s",

      "&:hover": {
        backgroundColor: transparentize(0.8, theme.palette.primary.light)
      }
    }
  };
});

export default function SearchResultCard({ title, author, year, link }) {
  const classes = useStyles();

  return (
    <Card
      className={classes.root}
      component="a"
      href={`https://openlibrary.org${link}`}
      rel="noopener"
      target="_blank"
      key={link}
    >
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body1">by {author}</Typography>
        <Typography variant="body1">published {year}</Typography>
      </CardContent>
    </Card>
  );
}

SearchResultCard.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  link: PropTypes.string.isRequired
};
