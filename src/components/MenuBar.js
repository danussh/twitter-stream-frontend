import React, { useState } from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import TwitterIcon from "@material-ui/icons/Twitter";
import NotificationsIcon from "@material-ui/icons/Notifications";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    backgroundColor: "#1DA1F2",
    "& .MuiAppBar-colorPrimary": {
      backgroundColor: "#2a7ffb",
    },
  },
  menuButton: {
    marginRight: "20px",
  },
  title: {
    display: "none",
    marginLeft: "10px",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    padding: "20px",
  },
}));

const MenuBar = ({ count }) => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("trending");
  // const [change, setChange] = useState("")

  const handleKeyPress = (e) => {
    setSearchTerm(e.target.value);
  };

  const searchTweets = (event) => {
    if (event.key === "Enter") {
      let term = searchTerm;
      console.log(term);
      axios
        .post("http://localhost:3001/setSearchTerm", {
          term:term
        })
        .then(() => console.log('search sucess'))
        .catch((err) => console.log(err));

    }
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <TwitterIcon />
          <Typography className={classes.title} variant="h6" noWrap>
            Twitter Stream
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={handleKeyPress}
              onKeyPress={searchTweets}
              // value={searchTerm}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 2 new notifications" color="inherit">
              <Badge badgeContent={count} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MenuBar;
