const mongoose = require("mongoose");
const { Contact } = require("../models/Contact.model");


const sendConsult = async (req, res) => {
    
    const { username, email, consult, phone} = req.body;
    const emailLC = email.toLowerCase();
 
    try {
      const consulta = new Contact({
        username,
        email: emailLC,
        consult,
        phone,
      });
      const response = await consulta.save();
      return res.status(201).json({
        message: `Consulta creada`,
        response,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        detail: err,
      });
    }
  };

  module.exports = {
    sendConsult,
  }