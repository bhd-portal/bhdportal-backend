const Pictures = require("../models/Picture");

exports.addPicture = function (req, res, next) {
    const body = req.body;
    if (!body.name || !body.file_id || !body.category_id) {
        return res.status(422).send({ error: "חסרים פרטים" });
    }
    const picture = new Picture(body);
    picture.save(function(err) {
        if (err) {
            return next(err);
        }
    });
    return res.status(200).send({ picture });
};

exports.patchPicture = function(req, res, next) {
    const { id } = req.body;
    if (!id) {
        return res.status(422).send({ error: "חסר מזהה תמונה" });
    }
    Pictures.findByIdAndUpdate(id, req.body, { new: true }, function(
        err,
        picture
    ) {
        if (err) {
            res.status(404).send(err);
            return next(err);
        }
        if (picture) {
            return res.status(200).send({ picture });
        } else {
            return res.status(404).send({ error: "לא קיימת תמונה עם מזהה זה" });
        }
    });
};

exports.deletePicture = function(req, res) {
    const { id } = req.query;
    if (!id) {
        return res.status(422).send({ error: "חסר מזהה תמונה " });
    }
    Pictures.findByIdAndRemove(id, function(err, picture) {
        if (err) {
            return res.status(404).send(err);
        }
        if (picture) {
            return res.status(200).send({ picture });
        } else {
            return res.status(404).send({ error: "לא קיימת תמונה עם מזהה זה" });
        }
    });
};

exports.getPictures = function(req, res, next) {
    const { category_id } = req.query;
    if (!category_id) {
        return res.status(422).send({ error: "חסר מזהה עמוד" });
    }

    Pictures.find({ category_id }, function(err, picture) {
        if (err) {
            return next(err);
        }
        if (picture) {
            return res.status(200).send({ picture });
        }
    });
};
