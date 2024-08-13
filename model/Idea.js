const mongoose = require('mongoose');
const moment = require('moment');

const IdeaSchema = new mongoose.Schema({
  text:{
    type:String,
    required:[true, 'Please add an idea']
  },
  tag:{
    type:String
  },
  username:{
    type: String
  },
  date:{
    type: Date,
    default: () => moment().format('YYYY-MM-DD')
  } 
})

module.exports = mongoose.model('Idea', IdeaSchema);