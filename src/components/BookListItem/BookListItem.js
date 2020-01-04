import React from "react";
import PropTypes from "prop-types";

// Components
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

export default function BookListItem({ title, author, link }) {
  return (
    <ListItem
      button
      component="a"
      href={`https://openlibrary.org${link}`}
      target="_blank"
      rel="noopener"
    >
      <ListItemText primary={title} secondary={author} />
    </ListItem>
  );
}

BookListItem.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
};
