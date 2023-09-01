const mongoose = require("mongoose");
const mercadopago = require("mercadopago");

const createPayment = async (req, res) => {
  const items = req.body
  const item = [
    {
      title: 'Test',
      quantity: 1,
      currency_id: 'CLP',
      unit_price: 10000
    }
  ]
  console.log(items);
  try {
    mercadopago.configure({
      access_token:
        "TEST-1836124793768346-090114-a6648c4f1341a8110ff9fcc2aa1daa29-1236171204",
    });
console.log(item)
    const preference = {
      item,
      back_urls: {
        success: "http://localhost:5173/success-purchase",
        pending: "http://localhost:5173/pending-payment",
        failure: "http://localhost:5173/failure-payment"
      },
    };
    console.log(preference)
    const respuesta = await mercadopago.preferences.create(preference);
    console.log(respuesta);
    return res.status(200).json({
      message: "OK",
      detail: respuesta,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

const successPayment = async (req, res) => {
  res.status(200).json({
    message: "OK",
    detail: req.query,
  });
};
const pendingPayment = async (req, res) => {
  res.status(200).json({
    message: "OK",
    detail: req.query,
  });
};
const failurePayment = async (req, res) => {
  res.status(200).json({
    message: "OK",
    detail: req.query,
  });
};

module.exports = {
  createPayment,
  successPayment,
  failurePayment,
  pendingPayment,
};
