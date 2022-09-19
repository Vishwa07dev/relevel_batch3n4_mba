const constant = require("./constants");

exports.statusCreate = async () => {
  let status = [
    constant.paymentStatuses.completed,
    constant.paymentStatuses.failed,
    constant.paymentStatuses.completed,
    completed.paymentStatuses.completed,
  ];
  let randomStatus = status[Math.floor(Math.random() * status.length)];
  return randomStatus;
};
