
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

const patchCommanderWord = (req, res, next) => {
    const body = req.body;

    if (!body.title || !body.content) {
        return res.status(422).send('title or content are missing.');
    }

    const commanderWord = new CommanderWords(body);

    CommanderWords.findOneAndUpdate({title: commanderWord.title}, {content: commanderWord.content}, {upsert: true}, function(err, doc){
        if (err) {
            console.log('error while patching commander word', err)
            return next(err);
        }
    });

    return res.status(200).send({ commanderWords: commanderWord });
};

const getCommanderWord = (req, res, next) => {
    if (req.query.title) {
        CommanderWords.find({title: req.query.title}, (err, result) => {
            console.log(result[0].toJSON().content);
            return res.status(200).send(result[0].toJSON().content);
        });
    } else {
        CommanderWords.find((err, result) => {
            return res.status(200).send(result.map(model => {
                return {
                    content: model.toJSON().content,
                    title: model.toJSON().title
                }
            }));
        });
    }
};

module.exports = {
    postCommanderWord,
    patchCommanderWord,
    getCommanderWord,
};
