const mongoose = require('mongoose')
const Schema = mongoose.Schema

const filterSchema = new Schema({
  name: {type: String, required: true},
  icon: {type: String, required: true}
},{
  timestamps: true
})

module.exports = mongoose.model('Filter', filterSchema)