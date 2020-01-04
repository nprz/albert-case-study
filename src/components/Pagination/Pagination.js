import React from "react";
import PropTypes from "prop-types";

// Components
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

// Style
import { makeStyles } from "@material-ui/core/Styles";

const useStyles = makeStyles(theme => {
  return {
    root: {
      height: 32,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 32
    },
    paginationCopy: {
      margin: "0px 8px"
    }
  };
});

const PAGE_SIZE = 10;

export default function Pagination({
  fetchSearchResults,
  totalResults,
  query,
  category,
  page
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <IconButton
          disabled={page === 1}
          onClick={() => fetchSearchResults(query, category, page - 1)}
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
      </div>
      <Typography variant="body1" className={classes.paginationCopy}>
        Page <b>{page}</b> of <b>{Math.ceil(totalResults / PAGE_SIZE)}</b>
      </Typography>
      <div>
        <IconButton
          disabled={page === Math.ceil(totalResults / PAGE_SIZE)}
          onClick={() => fetchSearchResults(query, category, page + 1)}
        >
          <KeyboardArrowRightIcon />
        </IconButton>
      </div>
    </div>
  );
}

Pagination.propTypes = {
  fetchSearchResults: PropTypes.func.isRequired,
  totalResults: PropTypes.number.isRequired,
  query: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired
};
