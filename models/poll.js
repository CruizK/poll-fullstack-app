const mongoose = require('mongoose');
const randomstring = require('randomstring');
const config = require('../config/database');

const PollSchema = mongoose.Schema({
  title: {
    type: String
  },
  options: [{
    name: String,
    id: Number,
    votes: {
      type: Number,
      default: 0
    }
  }],
  date: {
    type: Date,
    default: Date.now
  },
  tag: {
    type: String,
  }
});

PollSchema.methods.totalVotes = function(callback) {
  let totalVotes = 0;
  for(var i = 0; i < this.options.length; i++) {
    totalVotes += this.options[i].votes;
  }
  return totalVotes;
}

PollSchema.methods.getOption = function(id, callback) {
  for(var i = 0; i < this.options.length; i++) {
    if(this.options[i].id == id)
      return 
  }
}

const Poll = module.exports = mongoose.model('Poll', PollSchema);

const pollTagExists = function(tag) {
  let isExist = false;
  Poll.count({tag:tag}, function(err, count) {
    if(err) throw err;
    if(count>0) isExist = true;
  })
  return isExist;
}
module.exports.getPollById = function(id, callback) {
  Poll.findById(id, callback);
}
module.exports.getPollByTag = function(tag, callback) {
  Poll.findOne({tag:tag}, callback);
}

module.exports.addVote = function(tag, optionId, callback) {
  Poll.findOneAndUpdate({tag:tag, 'options.id': optionId}, {$inc: {'options.$.votes': 1}}, callback);
}

module.exports.addPoll = function(newPoll, callback) {
  let tag = randomstring.generate(config.tagLength);
  let tagExists = pollTagExists(tag)
  while(tagExists) {
    tag = randomstring.generate(config.tagLength);
    tagExists = pollTagExists(url);
  } 
  newPoll.tag = tag;
  newPoll.save(callback);
}
