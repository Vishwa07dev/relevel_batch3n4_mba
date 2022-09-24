const mailConfig = require("../configs/mail.config");

const Client = require("node-rest-client").Client;
const client = new Client();

module.exports = (subject, content, reciepients, requester) => {
  const reqBody = {
    subject: subject,
    recipientsEmailId: reciepients,
    content: content,
    requester: requester,
  };
  const reqHeaders = {
    "Content-Type": "application/json",
  };
  const args = {
    data: reqBody,
    headers: reqHeaders,
  };
  try {
    client.post(mailConfig.clientUrl, args, (err, data) => {
      console.log("Request sent");
      if (err) {
        console.log(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
};
