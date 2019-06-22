
const CommanderWords = require('../models/CommanderWords.js');

const postCommanderWord = (req, res, next) => {
    const body = req.body;
    const commanderWords = new CommanderWords(body);

    if (!body.title || !body.content) {
        return res.status(422).send('title or content are missing.');
    }

    commanderWords.save(err => {
        if (err) {
            return next(err);
        }
    });

    return res.status(200).send({ commanderWords });
};

const getCommanderWord = (req, res, next) => {
    CommanderWords.find({title: req.query.title}, (err, result) => {
        console.log(result[0].toJSON().content);
        return res.status(200).send(result[0].toJSON().content);
    });
};

module.exports = {
    postCommanderWord,
    getCommanderWord
};
