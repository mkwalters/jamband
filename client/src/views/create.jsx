import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { UserContext } from "../UserContext";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const Create = () => {
  const classes = useStyles();
  const { user, setUser } = useContext(UserContext);
  return (
    <div className="App">
      {/* <Button
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<CloudUploadIcon />}
      >
        Upload
      </Button> */}
      <Button variant="contained" component="label">
        Upload File
        <input type="file" hidden />
      </Button>
      <p>{user}</p>
    </div>
  );
};
export default Create;
