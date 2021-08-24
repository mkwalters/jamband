import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { UserContext } from "../UserContext";
import FileUpload from "../components/FileUpload";
import { Button } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
var _ = require("lodash");

const useStyles = makeStyles({
  upload: {
    backgroundColor: "#FFFDD0",
    maxWidth: "200px",
  },
});
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const UploadButton = ({ label }) => {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const [toggleUpload, setToggleUpload] = useState(false);
  const [open, setOpen] = useState(false);
  const openSnackBar = () => {
    setOpen(true);
  };

  const handleToggleUpload = () => {
    if (_.keys(user).length === 0) {
      openSnackBar();
      return;
    }
    setToggleUpload(toggleUpload ? false : true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
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
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card className={classes.upload}>
          <CardContent>
            <Button variant="outlined" onClick={handleToggleUpload}>
              {label}
            </Button>
            {toggleUpload && (
              <FileUpload previousPath="" user={user} original={true} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UploadButton;
