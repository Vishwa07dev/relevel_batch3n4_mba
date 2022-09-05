const Theatre = require("../models/theatre.model");

exports.create = async (req, res) => {
  const newObj = {
    name: req.body.name,
    description: req.body.description,
    city: req.body.city,
    pinCode: req.body.pinCode,
    showTypes: req.body.showTypes,
    numberOfSeats: req.body.numberOfSeats,
  };
  try {
    const newTheatre = await Theatre.create(newObj);
    return res.status(201).send(newTheatre);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send("Inteernal server error please try again later");
  }
};

exports.update = async (req, res) => {
  try {
    const theatre = await Theatre.findOne({ _id: req.params.id });
    (theatre.name = req.body.name ? req.body.name : theatre.name),
      (theatre.description = req.body.description
        ? req.body.description
        : theatre.description),
      (theatre.city = req.body.city ? req.body.city : theatre.city),
      (theatre.pinCode = req.body.pinCode ? req.body.pinCode : theatre.pinCode),
      (theatre.showTypes = req.body.showTypes
        ? req.body.showTypes
        : theatre.showTypes),
      (theatre.numberOfSeats = req.body.numberOfSeats
        ? req.body.numberOfSeats
        : theatre.numberOfSeats);
    await theatre.save();
    return res.status(200).send(theatre);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send("Inteernal server error please try again later");
  }
};

exports.getAllTheatre = async (req, res) => {
  try {
    const allTheatre = await Theatre.find();
    return res.status(200).send(allTheatre);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send("Inteernal server error please try again later");
  }
};

exports.getTheatreById = async (req, res) => {
  try {
    const theatre = await Theatre.findOne({ _id: req.params.id });
    return res.status(200).send(theatre);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send("Inteernal server error please try again later");
  }
};

exports.delete = async (req, res) => {
  try {
    const theatre = await Theatre.findOne({ _id: req.params.id });
    await theatre.remove();
    res.status(200).send("Successfully removed");
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send("Inteernal server error please try again later");
  }
};
