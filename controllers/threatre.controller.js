const Threatre = require("../models/threatre.model");
const constants = require("../Utils/constants");
exports.createthreatre = async(req, res) => {
    try {

        const threatreObj = {
            name: req.body.name,
            description: req.body.description,
            pincode: req.body.pincode,
            city: req.body.city,
            NumberOfSeat: req.body.NumberOfSeat,
            showTypes: req.body.showTypes
        }
        const threatre = await Threatre.create(threatreObj);
        res.status(201).send(threatre);


    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: "some  internal server error while the createthreatre" })
    }
}
exports.updatethreatre = async(req, res) => {
    try {
        const threatre = await Threatre.findOne({ _id: req.params.id });
        if (!threatre) {
            return res.status(400).send({ message: "Failed is not valid" })
        }
        threatre.name = req.body.name != undefined ? req.body.name : threatre.name;
        threatre.description = req.body.description != undefined ? req.body.description : threatre.description;
        threatre.pincode = req.body.pincode != undefined ? req.body.pincode : threatre.pincode;
        threatre.city = req.body.city != undefined ? req.body.city : threatre.city;
        threatre.NumberOfSeat = req.body.NumberOfSeat != undefined ? req.body.NumberOfSeat : threatre.NumberOfSeat;
        threatre.showTypes = req.body.showTypes != undefined ? req.body.showTypes : threatre.showTypes;

        const updatethreatre = await threatre.save();
        res.status(200).send({ message: "successfully the update threatre" })
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: "some  internal server error while the updatethreatre" })
    }
}
exports.deletethreatre = async(req, res) => {
    try {
        const threatre = await Threatre.findOne({
            _id: req.params.id
        })
        if (!threatre) {
            return res.status(400).send({
                message: 'Faliedprovied threatre Invalidate'
            })
        }
        await Threatre.deleteOne({ _id: req.params.id })
        res.status(200).send({ message: "Threatre deleted successfully" });


    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: "some  internal server error while the deletethreatre" })
    }
}
exports.getAllthreatre = async(req, res) => {
    try {

        const threatre = await Threatre.findOne({
            _id: req.params.id
        })
        if (!threatre) {
            return res.status(400).send({
                message: 'Falied  provied threatre Invalidate'
            })
        }
        res.status(200).send(threatre);

    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: "some  internal server error while the getAllthreatre" })
    }
}
exports.getByIdthreatre = async(req, res) => {
    try {


        const queryObj = {};
        if (req.query.name) {
            queryObj.name = req.query.name;
        }
        const threatre = await Threatre.find(queryObj);
        res.status(200).send(threatre);
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: "some  internal server error while the getByIdthreatre" })
    }
}
