var _ = require("lodash");

const userLoggedin = (user) => {
  if (_.keys(user).length === 0 || user === null) {
    return false;
  } else {
    return true;
  }
};

const getSongs = async (user) => {
  let userId = -1;
  if (_.keys(user).length > 0) {
    userId = user.user_id;
  }
  let serverFetch = await fetch("/songs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({ userId }),
  });
  let data = await serverFetch.json();
  return data;
};

const vote = async (songId, liked, user) => {
  let serverFetch = await fetch("/votes", {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({ songId, liked, userId: user.user_id }), // body data type must match "Content-Type" header
  });
  let data = await serverFetch.json();
  return data;
};

export default { getSongs, vote, userLoggedin };
