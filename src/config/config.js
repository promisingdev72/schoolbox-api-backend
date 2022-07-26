require("dotenv").config();

exports.HOST_API = process.env.REACT_APP_SERVER_API || "";
exports.AUTH_TOKEN = process.env.REACT_APP_BEARER_TOKEN || "";
exports.NEWS_API = process.env.REACT_APP_NEWS_API || "";
