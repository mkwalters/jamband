import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import FileUpload from "../components/FileUpload";

const Create = () => {
  const { user } = useContext(UserContext);

  const [songName, setSongName] = useState("");

  // const changeSongName = (event) => {
  //   setSongName(event.target.value);
  // };

  return (
    <div className="App">
      <p>{JSON.stringify(user)}</p>
      {/* <input type="text" value={songName} onChange={changeSongName} /> */}
      <FileUpload previousPath="" user={user} original={true} />
    </div>
  );
};
export default Create;
