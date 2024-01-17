const mongoose = require('mongoose')

const AddressSchema = new mongoose.Schema({
  country: { type: String, default: '' },
  city: { type: String, default: '' }
})

const Address = mongoose.model('Address', AddressSchema)

module.exports = { Address, AddressSchema }
// Address
