const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = Schema({
    username: { type: String, required: true, unique: true },
    password: {type: String, required: true},
    name:  {type: String, required: true},
    age: {type: Number, required: false},
    weight: {type: Number, required: false}, 
    height: {type: Number, required: false},
    healthConditions: {type: Array, required: false},
    fitnessLevel: {type: String, required: false}
})

const User = mongoose.model('User', UserSchema)

module.exports = User