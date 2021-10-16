import React,{useState} from "react";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 675,
    flex: 1,
    margin: 5,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Tweets({ tweets }) {

  const [likes,setLikes]=useState(0)
  const classes = useStyles();
  
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <img src={tweets.user.profile_image_url} />
          </Avatar>
        }
        title={tweets.user.name}
        subheader={tweets.user.location}
      />
      <CardContent>
        <Typography variant="h5" color="textSecondary" component="h3">
          {tweets.text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={()=>setLikes(likes+1)}>
          <FavoriteIcon style={{ color: "red" }} />
          <span>{tweets.user.friends_count + likes}</span>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
