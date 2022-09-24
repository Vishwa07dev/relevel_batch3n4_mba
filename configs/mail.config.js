if (process.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config();
}

module.exports = {
  companyEmail: process.env.COMPANY_EMAIL,
  clientUrl: process.env.CLIENT_URL,
};
