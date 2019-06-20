const Picture = require("../models/Picture");

exports.addPicture = function (req, res, next) {
    const body = req.body;
    if (!body.name || body.file_id || !body.picture_category) {
        return res.status(422).send({ error: "חסרים פרטים" });
    }
    const picture = new Picture(body);
    picture.save(function (err) {
        return next(err);
    })
};