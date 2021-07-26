import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const Create = () => {
  const classes = useStyles();
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
    </div>
  );
};
export default Create;
