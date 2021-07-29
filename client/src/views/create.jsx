import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import FileUpload from "../components/FileUpload";

const Create = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="App">
      <p>{JSON.stringify(user)}</p>
      <p>lisv</p>
      <FileUpload />
    </div>
  );
};
export default Create;
