const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  alternateNumber: { type: String, required: true },
  address: { type: String, required: true },
  pincode: { type: String, required: true },
  quantity: { type: Number, required: true },
  paymentMode: { type: String, default: 'COD' },
  product: {
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
  },
  status: {
    type: String,
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', orderSchema);
