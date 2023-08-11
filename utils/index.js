const getDateTime = require("./dateTime");
const checkAuth = require("./checkAuth");

module.exports = {
  getDateTime,
  checkAuth,
  ...require("./firstLoad"),
  ...require("./setting"),
  ...require("./loadingCache"),
};
