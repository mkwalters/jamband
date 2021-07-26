import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../UserContext";
import FileUpload from "../components/FileUpload";

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
      <p>{JSON.stringify(user)}</p>
      <p>lisv</p>
      <FileUpload />
    </div>
  );
};
export default Create;
