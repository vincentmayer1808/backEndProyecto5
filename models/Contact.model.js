const mongoose = require("mongoose");

const ContactScheme = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
        },
      },
    },
    phone: {
      type: Number,
      required: false,
    },
    consult:{
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model("Contact", ContactScheme);

module.exports = {Contact};
