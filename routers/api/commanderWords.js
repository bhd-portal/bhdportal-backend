
const express = require('express');
const router = express.Router();
const CommanderWords = require('../../controllers/CommanderWords.js');

router.post('/', CommanderWords.postCommanderWord);
router.patch('/', CommanderWords.patchCommanderWord);
router.get('/', CommanderWords.getCommanderWord);

module.exports = router;
