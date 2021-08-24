import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import FileUpload from "../components/FileUpload";
import { Button } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import api from "../api.js";
var _ = require("lodash");

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const UploadButton = ({ label }) => {
  const { user } = useContext(UserContext);
  const [toggleUpload, setToggleUpload] = useState(false);
  const [open, setOpen] = useState(false);
  const openSnackBar = () => {
    setOpen(true);
  };

  const handleToggleUpload = () => {
    if (!api.userLoggedin(user)) {
      openSnackBar();
    } else {
      setToggleUpload(toggleUpload ? false : true);
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
    } else {
      setOpen(false);
    }
  };

  return (
    <div>
      <div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="warning">
            Please log in to upload
          </Alert>
        </Snackbar>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="outlined" onClick={handleToggleUpload}>
          {label}
        </Button>
        {toggleUpload && (
          <FileUpload previousPath="" user={user} original={true} />
        )}
      </div>
    </div>
  );
};

export default UploadButton;
