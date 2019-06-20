
const CommanderWords = require('../models/CommanderWords.js');

const addCommanderWord = (req, res) => {
    const body = req.body;
    const commanderWords = new CommanderWords(body);

    if (!body.title || !body.content) {
        res.status(422).send('title or content are missing.');
    }

    commanderWords.save(err => {
        res.sendStatus(500);
    });

    res.sendStatus(200);
};

module.exports = {
    addCommanderWord
};
