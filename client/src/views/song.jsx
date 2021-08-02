import React, { useState, useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Link, useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import FileUpload from "../components/FileUpload";
import { makeStyles } from "@material-ui/core/styles";
import { TreeView, TreeItem } from "@material-ui/lab";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles({
  root: {
    height: 110,
    flexGrow: 1,
    maxWidth: 400,
  },
});

const Song = () => {
  const classes = useStyles();
  const data = {
    id: "root",
    name: "Parent",
    children: [
      {
        id: "1",
        name: "Child - 1",
      },
      {
        id: "3",
        name: "Child - 3",
        children: [
          {
            id: "4",
            name: "Child - 4",
          },
        ],
      },
    ],
  };

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
            id: input[i].id,
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
            setFamilyTree(transformedData(json.data));
          });
        });
      });
    });
  }, []);

  return (
    <div>
      <p>song page</p>
      {id}
      <AudioPlayer
        src={songData.s3key}
        onPlay={(e) => console.log("onPlay")}
        // other props here
      />
      <Button variant="outlined" onClick={toggleRemixing}>
        remix
      </Button>
      {remixing && <FileUpload previousPath={songData.path} />}
      <p>{songData.path}</p>
      <p>{JSON.stringify(familyTree)}</p>
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpanded={["root"]}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {renderTree(familyTree)}
      </TreeView>
    </div>
  );
};
export default Song;
