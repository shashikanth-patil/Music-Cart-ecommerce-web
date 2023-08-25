const mongoose = require("mongoose");
const cartId = new mongoose.Schema({
  cartId: { type: String },
  productQuantity: { type: Number },
});
const addCartProductSchema = new mongoose.Schema({
  email: { type: String },
  id: [cartId],
});
module.exports = mongoose.model("addCartProduct", addCartProductSchema);
