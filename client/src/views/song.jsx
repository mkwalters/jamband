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

  const { id } = useParams();

  const [songData, setSongData] = useState([]);
  const [remixing, setRemixing] = useState(false);

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
    fetch(`/songs/${id}`).then((data) => {
      data.json().then((json) => {
        console.log(json.data[0]);
        setSongData(json.data[0]);
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

      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpanded={["root"]}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {renderTree(data)}
      </TreeView>
    </div>
  );
};
export default Song;
