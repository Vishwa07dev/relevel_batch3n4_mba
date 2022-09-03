//this util function is responsible for triming(remove unwanted spaces)in  the request body ,all properties(key) values of string type

const trimValuesInRequestBody = (req) => {
  for (let key in req.body) {
    if (typeof req.body[key] == "string") {
      req.body[key] = req.body[key].trim();
    }
  }
};

module.exports = trimValuesInRequestBody;
