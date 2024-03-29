const mongoose = require('mongoose')

const Identifier = mongoose.model(
  'Identifier',
  new mongoose.Schema({
    cardCode: String,
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer'
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address'
    }
  })
)

module.exports = Identifier
