
const express = require('express');
const router = express.Router();
const CommanderWords = require('../../controllers/CommanderWords.js');

router.post('/', CommanderWords.addCommanderWord);

module.exports = router;
