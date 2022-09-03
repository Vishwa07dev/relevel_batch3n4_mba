if (process.NODE_ENV !== "production") {
  require("dotenv").config();
}

module.exports = {
  DB_URI: process.env.DB_URI,
};
