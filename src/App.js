import "./App.css";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuBar from "./components/MenuBar";
import Tweets from "./components/Tweets";
import socketIOClient from "socket.io-client";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  tweetContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const App = () => {
  const [tweets, settweets] = useState([]);
  const [count, setCount] = useState(null);
  const [load, setLoad] = useState(25);
  const classes = useStyles();

  useEffect(() => {
    const socket = socketIOClient("https://twitter-api-stream.herokuapp.com/");
    // Test in Server: https://twitter-api-stream.herokuapp.com/
    // Test in Local : http://localhost:3001/
    socket.on("connect", () => {
      socket.on("tweets", (data) => {
        settweets([...tweets, data]);
        setCount(count + 1);
      });
    });
    socket.on("disconnect", () => {
      socket.off("tweets");
      socket.removeAllListeners("tweets");
      console.log("Socket Disconnected");
    });
  }, [count, tweets]);

  const handleShowMore = () => {
    setLoad((load) => load + 10);
  };

  return (
    <div>
      <MenuBar count={count} />
      <div className="container mt-2 mb-2 justify-content-center">
        <div className="col-12 ">
          {tweets.length === 0 ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ marginTop: "30%" }}
            >
              <CircularProgress />
            </div>
          ) : (
            ""
          )}
          <div className={classes.tweetContainer}>
            {tweets.slice(0, load).map((val) => {
              return <Tweets tweets={val} />;
            })}
          </div>
        </div>
        {tweets.length >= 5 && (
          <div className=" mt-4 d-flex justify-content-center">
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleShowMore}
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
