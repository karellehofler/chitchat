const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

router.get('/', (req, res) => {
    Message.find({})
    .sort({ date: -1 })
    .then((messages) => res.json(messages))
    .catch(err => res.json(err));
});

module.exports = router;