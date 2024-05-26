const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = Schema({
    email: { type: String, unique:true, required: true },
    password: {type: String, required: true},
    firstName:  {type: String, required: true},
    lastName: {type: String, required: false},
    age: {type: Number, required: false},
    weight: {type: Number, required: false}, 
    height: {type: Number, required: false},
    healthConditions: {type: Array, required: false},
    fitnessLevel: {type: String, required: false}
})

const User = mongoose.model('User', UserSchema)

module.exports = User