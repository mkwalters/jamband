import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../UserContext";
import FileUpload from "../components/FileUpload";

const Create = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="App">
      <p>{JSON.stringify(user)}</p>
      <p>lisv</p>
      <FileUpload />
    </div>
  );
};
export default Create;
