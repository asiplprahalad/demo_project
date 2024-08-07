const mongoose = require('mongoose');
const ProductSchema = require('./Product').schema;

const QuotationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [ProductSchema],
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Quotation', QuotationSchema);