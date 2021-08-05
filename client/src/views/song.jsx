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

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles({
  root: {
    minWidth: 700,
    marginTop: "12px",
    marginBottom: "12px",
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
  const { user, setUser } = useContext(UserContext);

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

  const toggleRemixing = () => {
    setRemixing(remixing ? false : true);
  };

  const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
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
      <Card className={classes.root}>
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
            src={songData.s3key}
            onPlay={(e) => console.log("onPlay")}
            style={{ opacity: "0.5" }}
            // other props here
          />

          <IconButton
            onClick={() => {
              download(songData.s3key, `${songData.name}.mp3`);
            }}
          >
            <CloudDownloadIcon />
          </IconButton>

          {/* <a href={songData.s3key} download="filename.mp3">
            Click to download
          </a> */}

          <Button variant="outlined" onClick={toggleRemixing}>
            Upload a remix
          </Button>
          {remixing && (
            <FileUpload
              previousPath={songData.path}
              user={user}
              original={false}
            />
          )}
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

      <Card className={classes.root}>
        <CardContent>
          <h3>Song ancestry </h3>
          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpanded={["root"]}
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
