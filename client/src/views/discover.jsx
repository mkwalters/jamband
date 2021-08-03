import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const Discover = () => {
  const classes = useStyles();
  const { user, setUser } = useContext(UserContext);
  const [songs, setSongs] = useState([]);

  const getUser = async () => {
    fetch("/getUser").then((data) => {
      data.json().then((json) => {
        setUser(json);
      });
    });
  };

  const readData = () => {
    fetch("/pgTest");
  };

  const getSongs = () => {
    fetch("/songs").then((data) => {
      data.json().then((json) => {
        setSongs(json.data);
      });
    });
  };

  useEffect(() => {
    setUser(getUser());
    getSongs();
  }, []);

  return (
    <div className="App">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Song Name</TableCell>
              <TableCell>audio player</TableCell>
              <TableCell>author</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {songs.map((song, index) => (
              <TableRow key={song.name}>
                <TableCell>{song.name}</TableCell>
                <TableCell component="th" scope="row">
                  <AudioPlayer
                    src={song.s3key}
                    onPlay={(e) => console.log("onPlay")}
                    header={song.name}
                    // other props here
                  />
                </TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    component={Link}
                    to={"/song/" + song.id.toString()}
                  >
                    {"Remix >"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {songs.map((song, index) => (
        <div key={index}>
          <Button
            variant="outlined"
            component={Link}
            to={"/song/" + song.id.toString()}
          >
            go to {song.name}
          </Button>
          <AudioPlayer
            src={song.s3key}
            onPlay={(e) => console.log("onPlay")}
            header={song.name}
            // other props here
          />
        </div>
      ))}
      <button onClick={readData}>read data</button>
    </div>
  );
};
export default Discover;
