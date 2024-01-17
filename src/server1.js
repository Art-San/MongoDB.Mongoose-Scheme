// Один-к-одному Ссылки
const mongoose = require('mongoose')

mongoose
  .connect('mongodb://127.0.0.1:27017/mongoDB-test_Schema', {
    // .connect('mongodb://localhost/bezkoder_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Successfully connect to MongoDB.'))
  .catch((err) => console.error('Connection error', err))
// mongoDB-test_Schema

//----------------------------------------------------------------------
const Customer = require('./models/var1/Customer')
const Identifier = require('./models/var1/Identifier')
const { Address } = require('./models/var1/Address')

const createCustomer = function (name, age, gender) {
  const customer = new Customer({
    name,
    age,
    gender
  })

  return customer.save()
}

const createAddress = function (country = '') {
  const address = new Address({
    country
  })

  return address.save()
}

const createIdentifier = function (cardCode, customerId, addressId) {
  const identifier = new Identifier({
    cardCode,
    customer: customerId,
    address: addressId
  })

  return identifier.save()
}

// let customerId

// createCustomer('san', 43, 'male')
//   .then((customer) => {
//     customerId = customer._id.toString()
//     console.log('> Created new Customer\n', customer)

//     return createAddress()
//   })
//   .then((address) => {
//     console.log('> Created new address\n', address)
//     const addressId = address._id.toString()

//     return createIdentifier(
//       customerId.substring(0, 10).toUpperCase(),
//       customerId,
//       addressId
//     )
//   })
//   .then((identifier) => {
//     console.log('> Created new Identifier\n', identifier)
//   })
//   .catch((err) => console.log(err))

showAllIdentifier = async function () {
  //---------------   All
  // const identifiers = await Identifier.find().populate('customer')

  // ------------------ по ID
  // const identifiers = await Identifier.findById(
  //   '65a76b5b60b968c659b89be0'
  // ).populate('customer')

  // ----------------- не выводим поля у customer -_id -__v
  // const identifiers = await Identifier.find().populate('customer', '-_id -__v')

  // ----------------- не выводим поля у customer -_id -__v  и identifier __v
  const identifiers = await Identifier.find()
    .populate('address', '-_id -__v')
    .select('-__v')

  console.log('> All Identifiers\n', identifiers)
}

// > All Identifiers
//  [
//   {
//     _id: new ObjectId('65a7c8e8a73363563b3c5e0f'),
//     cardCode: '65A7C8E8A7',
//     customer: new ObjectId('65a7c8e8a73363563b3c5e0a'),
//     address: { country: '', city: '' }
//   }
// ]
showAllIdentifier()

// node server1.js

//---------------- Идентификатор + клиент -------------------------------
// const Customer = require('./models/var1/Customer')
// const Identifier = require('./models/var1/Identifier')

// const createCustomer = function (name, age, gender) {
//   const customer = new Customer({
//     name,
//     age,
//     gender
//   })

//   return customer.save()
// }

// const createIdentifier = function (cardCode, customerId) {
//   const identifier = new Identifier({
//     cardCode,
//     customer: customerId
//   })

//   return identifier.save()
// }

// createCustomer('san', 43, 'male')
//   .then((customer) => {
//     console.log('> Created new Customer\n', customer)

//     const customerId = customer._id.toString()
//     return createIdentifier(
//       customerId.substring(0, 10).toUpperCase(),
//       customerId
//     )
//   })
//   .then((identifier) => {
//     console.log('> Created new Identifier\n', identifier)
//   })
//   .catch((err) => console.log(err))

// > All Identifiers
//  [
//   {
//     _id: new ObjectId('65a76316196b9255ae381aad'),
//     cardCode: '65A7631619',
//     customer: { name: 'bezkoder', age: 29, gender: 'male' }
//   }
// ]
