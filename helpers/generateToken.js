const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET_KEY;

const generateToken = (user) => {
 
  const { _id, username, email, phone, role } = user;
  return jwt.sign({ _id, username, email, phone, role }, secret, {
    expiresIn: "30d",
  });
};

module.exports=generateToken
