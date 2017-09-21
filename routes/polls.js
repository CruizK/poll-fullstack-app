const express = require('express');
const router = express.Router();
const Poll = require('../models/poll');

router.post('/create', (req, res, next) => {
  let newPoll = new Poll({
    title: req.body.title,
    options: []
  });
  for(let i = 0; i < req.body.options.length; i++) {
    let option = {
      name: req.body.options[i].name,
      id: req.body.options[i].id
    }
    newPoll.options.push(option);
  }

  Poll.addPoll(newPoll, (err, poll) => {
    if(err) res.json({success: false, msg: 'Failed to create Poll'});
    else res.json({success: true, msg: "Successfully created Poll", tag: poll.tag});
  })
})

router.post('/get', (req, res, next) => {
  Poll.getPollByTag(req.body.tag, (err, poll) => {
    if(err) {
      throw err;
    } else if(poll === null || poll === undefined) {
      return res.json({success: false, msg: 'Could not find poll of that tag'});
    }
    else {
      res.json({
        success: true,
        poll: {
          title: poll.title,
          options: poll.options, //TODO: Add poll method to get all options without the _id attatched.
          date: poll.date,
          tag: poll.tag
        }
      })
    }
  })
})

router.post('/update', (req, res, next) => {
  Poll.addVote(req.body.tag, req.body.optionId, (err, poll) => {
    if(err) throw err;
    else if (poll === null || poll === undefined) {
      return res.json({success: false, msg: 'Could not find poll or failed to update'});
    }
    else {
      req.io.emit('voteAdded', {tag: req.body.tag, optionId: req.body.optionId});
      return res.json({success: true,msg: "Successfully added vote" });
    }
  })
})

module.exports = router;