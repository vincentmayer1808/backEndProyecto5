const mongoose = require("mongoose");
const{Service} = require("../models/Service.model")
const createService = async (req, res) => {
  const { serviceName, categorie, duration, description, largeDesc, price, image, assisting } =
    req.body;
  try {
    const service = new Service({
        serviceName,
        categorie,
        duration,
        description,
        largeDesc,
        price,
        image,
        assisting,
    })
    const response= await service.save()
    return res.status(201).json({
        message:"Service Created",
        response,
    })
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      detail: err,
    });
  }
};
const getServices = async (req, res) => {
  try {
    const resp = await Service.find();
    return res.status(200).json({
      message: "ok",
      detail: resp,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      detail: err,
    });
  }
};
const getService = async (req, res) => {
const{serviceName}=req.params
  try {
    console.log(serviceName)
    const resp = await Service.findOne({serviceName:serviceName});
    return res.status(200).json({
      message: "ok",
      detail: resp,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      detail: err,
    });
  }
};

const deleteService = async (req, res) => {
    const { _id } = req.params;
    try {
      const resp = await Service.findByIdAndDelete(_id);
      if (resp) {
        return res.status(200).json({
          messege: "Service deleted",
          detail: resp,
        });
      }
      return res.status(404).json({
        message: "service not found",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server Error",
        error,
      });
    }
  };
  const updateService = async (req, res) => {
    const { _id } = req.params;
    const { serviceUpdated } = req.body;
    try {
      const resp = await Service.findByIdAndUpdate(
        _id,
        { ...serviceUpdated},
        { new: true }
      );
      if (resp) {
        return res.status(200).json({
          message: "Service updated",
          detail: resp,
        });
      }
      return res.status(404).json({
        message: "Service not found",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server Error",
        error,
      });
    }
  };
  

module.exports = {
  createService,
  getServices,
  deleteService,
  updateService,
  getService
};
