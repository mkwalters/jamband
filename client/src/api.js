var _ = require("lodash");

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

export default { getSongs };
