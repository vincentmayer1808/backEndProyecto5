const mongoose = require("mongoose");

const UserScheme = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      validate: {
        validator: function (v) {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
        },
      },
    },
    phone: {
      type: Number,
      required: true,
    },
    paidProduct: {
      type: Object,
      required:false,
    },
    role:{
      type: String,
      required:true,
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserScheme);

module.exports = {User};
