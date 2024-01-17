const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
  phone: { type: String, default: '' },
  email: { type: String, default: '' }
})

const Contact = mongoose.model('Contact', ContactSchema)

module.exports = { Contact, ContactSchema }
