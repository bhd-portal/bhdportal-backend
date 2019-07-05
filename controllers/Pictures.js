const Picture = require("../models/Picture");

exports.addPicture = function (req, res, next) {
    const body = req.body;
    if (!body.name || !body.file_id || !body.album_id) {
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
    Picture.findByIdAndUpdate(id, req.body, { new: true }, function(
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
    Picture.findByIdAndRemove(id, function(err, picture) {
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
    const { album_id } = req.query;
    if (!album_id) {
        return res.status(422).send({ error: "חסר מזהה אלבום" });
    }

    Picture.find({ album_id }, function(err, pictures) {
        if (err) {
            return next(err);
        }
        if (pictures) {
            return res.status(200).send({ pictures });
        }
    });
};
