const mongoose = require('mongoose')
const { ContactSchema } = require('./Contact')
const UserSchema = require('./User').UserSchema

const Identifier = mongoose.model(
  'Number',
  new mongoose.Schema({
    cardCode: String,
    user: UserSchema,
    contact: ContactSchema
  })
)

module.exports = Identifier
