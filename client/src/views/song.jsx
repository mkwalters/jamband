import React, { useState, useEffect, useContext } from "react";
import AudioPlayer from "react-h5-audio-player";
// import "react-h5-audio-player/lib/styles.css";
import { Link, useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import FileUpload from "../components/FileUpload";
import { makeStyles } from "@material-ui/core/styles";
import { TreeView, TreeItem } from "@material-ui/lab";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { UserContext } from "../UserContext";
import UploadButton from "../components/UploadButton";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import IconButton from "@material-ui/core/IconButton";
import "../card.css";
var _ = require("lodash");

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  root: {
    minWidth: 700,
    marginTop: "12px",
    marginBottom: "12px",
    marginLeft: "12px",
    marginRight: "12px",
    backgroundColor: "#FFFDD0",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 18,
  },
  author: {
    fontSize: 13,
  },
  tree: {},
});

const Song = () => {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const parentNodeIds = [];
  const [playing, setPlaying] = useState(false);

  let transformedData = (input) => {
    var output = [];
    for (var i = 0; i < input.length; i++) {
      var chain = input[i].path.split(".");
      var currentNode = output;
      for (var j = 0; j < chain.length; j++) {
        var wantedNode = chain[j];
        var lastNode = currentNode;
        for (var k = 0; k < currentNode.length; k++) {
          if (currentNode[k].pathName == wantedNode) {
            currentNode = currentNode[k].children;
            break;
          }
        }
        // If we couldn't find an item in this list of children
        // that has the right pathName , create one:
        if (lastNode == currentNode) {
          parentNodeIds.push(input[i].song_id);
          var newNode = (currentNode[k] = {
            id: input[i].song_id,
            name: input[i].name,
            pathName: wantedNode,
            children: [],
          });
          currentNode = newNode.children;
        }
      }
    }
    return output[0];
  };

  const { id } = useParams();

  const [songData, setSongData] = useState([]);
  const [remixing, setRemixing] = useState(false);
  const [allSongData, setAllSongData] = useState([]);
  const [familyTree, setFamilyTree] = useState([]);
  const [open, setOpen] = useState(false);

  const toggleRemixing = () => {
    if (_.keys(user).length === 0) {
      openSnackBar();
      return;
    }
    setRemixing(remixing ? false : true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const openSnackBar = () => {
    setOpen(true);
  };
  const renderTree = (nodes) => (
    <TreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={nodes.name}
      onLabelClick={(event) => {
        event.preventDefault();
      }}
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  useEffect(() => {
    console.log("mounted");
    fetch(`/songs/${id}`).then((data) => {
      data.json().then((json) => {
        console.log(json.data[0]);
        setSongData(json.data[0]);

        let originalAncestor = json.data[0].path.split(".")[0];
        console.log("original ancestor: ", originalAncestor);

        fetch(`/songs/getTree/${originalAncestor}`).then((data) => {
          data.json().then((json) => {
            console.log(json.data);
            setAllSongData(json.data);
            setFamilyTree(transformedData(json.data));
          });
        });
      });
    });
  }, []);

  const selectFromTree = (event, value) => {
    console.log(value);

    allSongData.forEach((datum) => {
      if (datum.song_id === value) {
        setSongData(datum);
      }
    });
  };

  const download = (url, name) => {
    if (!url) {
      throw new Error("Resource URL not provided! You need to provide one");
    }

    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobURL = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobURL;
        a.style = "display: none";

        if (name && name.length) a.download = name;
        document.body.appendChild(a);
        a.click();
      })
      .catch(() => {
        console.log("error");
      });
  };

  return (
    <div>
      <div className={classes.root}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="warning">
            Please log in to upload
          </Alert>
        </Snackbar>
      </div>
      <Card className={playing ? "song-card-selector" : classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textPrimary"
            gutterBottom
            style={{ display: "inline" }}
          >
            {songData.name}
          </Typography>

          <AudioPlayer
            src={""}
            onPlay={(e) => {
              setPlaying(true);
            }}
            onPause={(e) => {
              setPlaying(false);
            }}
            style={{ opacity: "0.5" }}
            // other props here
          />
        </CardContent>
        <CardActions>
          <IconButton
            onClick={() => {
              download(songData.s3key, `${songData.name}.mp3`);
            }}
          >
            <CloudDownloadIcon />
          </IconButton>
          <div>
            <UploadButton label="Remix this track"></UploadButton>
          </div>
        </CardActions>
      </Card>

      <Card className={classes.root}>
        <CardContent>
          <h3>Song ancestry </h3>
          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpanded={parentNodeIds}
            defaultExpandIcon={<ChevronRightIcon />}
            onNodeSelect={selectFromTree}
          >
            {renderTree(familyTree)}
          </TreeView>
        </CardContent>
        <CardActions>
          {/* <Button
                  variant="outlined"
                  component={Link}
                  to={"/song/" + song.song_id.toString()}
                >
                  {"Remix >"}
                </Button> */}
        </CardActions>
      </Card>
    </div>
  );
};
export default Song;
