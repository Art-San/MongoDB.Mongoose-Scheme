// один-к-одному встраивание

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

//------------------------   Number + User + Contact -----------------------------
const User = require('./models/var2/User').User
const Number = require('./models/var2/Number')
const Contact = require('./models/var2/Contact').Contact

const createUser = function (name, age, gender) {
  const user = new User({
    name,
    age,
    gender
  })

  return user.save()
}

const createContact = function (phone = '') {
  const contact = new Contact({
    phone
  })

  return contact.save()
}

const createNumber = function (cardCode, user, contact) {
  const number = new Number({
    cardCode,
    user,
    contact
  })

  return number.save()
}

let createdUser

createUser('art', 43, 'male')
  .then((user) => {
    createdUser = user // Сохраняем пользователя в переменной для использования в следующем блоке then
    console.log('> Created new User\n', user)

    return createContact() // Параметр phone используется по умолчанию ('')
  })
  .then((contact) => {
    console.log('> Created new Contact\n', contact)

    return createNumber(
      createdUser._id.toString().substring(0, 10).toUpperCase(),
      createdUser,
      contact
    )
  })
  .then((number) => {
    console.log('> Created new Number\n', number)
  })
  .catch((err) => console.log(err))

showAllNumber = async function () {
  // ----------------     все
  // const numbers = await Number.find()

  // ------------------
  const numbers = await Number.find().select(
    '-__v -user.__v -user._id -contact.__v -contact._id'
  )

  console.log('> All Numbers\n', numbers)
}

// All Numbers
// [
//   {
//     _id: new ObjectId('65a7ad85d0e9cac3c835e85a'),
//     cardCode: '65A7AD85D0',
//     user: { name: 'art', age: 43, gender: 'male' },
//     contact: { phone: '', email: '' }
//   }
// ]

showAllNumber()

// node server2.js

//--------------------   Number + User --------------------------------
// const User = require('./models/var2/User').User
// const Number = require('./models/var2/Number')
// const Contact = require('./models/var2/Contact').Contact

// const createUser = function (name, age, gender) {
//   const user = new User({
//     name,
//     age,
//     gender
//   })

//   return user.save()
// }

// const createNumber = function (cardCode, user) {
//   const number = new Number({
//     cardCode,
//     user
//   })

//   return number.save()
// }

// createUser('art', 43, 'male')
//   .then((user) => {
//     console.log('> Created new User\n', user)

//     return createNumber(
//       user._id.toString().substring(0, 10).toUpperCase(),
//       user
//     )
//   })
//   .then((number) => {
//     console.log('> Created new Number\n', number)
//   })
//   .catch((err) => console.log(err))
