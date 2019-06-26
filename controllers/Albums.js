const Album = require("../models/Album");

exports.addAlbum = function (req, res, next) {
    const body = req.body;
    if (!body.name || !body.images || !body.category_id) {
        return res.status(422).send({ error: "חסרים פרטים" });
    }
    const Album = new Album(body);
    Album.save(function(err) {
        if (err) {
            return next(err);
        }
    });
    return res.status(200).send({ Album });
};

exports.patchAlbum = function(req, res, next) {
    const { id } = req.body;
    if (!id) {
        return res.status(422).send({ error: "חסר מזהה אלבום" });
    }
    Album.findByIdAndUpdate(id, req.body, { new: true }, function(
        err,
        Album
    ) {
        if (err) {
            res.status(404).send(err);
            return next(err);
        }
        if (Album) {
            return res.status(200).send({ Album });
        } else {
            return res.status(404).send({ error: "לא קיים אלבום עם מזהה זה" });
        }
    });
};

exports.deleteAlbum = function(req, res) {
    const { id } = req.query;
    if (!id) {
        return res.status(422).send({ error: "חסר מזהה אלבום" });
    }
    Album.findByIdAndRemove(id, function(err, album) {
        if (err) {
            return res.status(404).send(err);
        }
        if (album) {
            return res.status(200).send({ album });
        } else {
            return res.status(404).send({ error: "לא קיים אלבום עם מזהה זה" });
        }
    });
};

exports.getAlbums = function(req, res, next) {
    const { category_id } = req.query;
    if (!category_id) {
        return res.status(422).send({ error: "חסר מזהה קטגוריה" });
    }

    Album.find({ category_id }, function(err, album) {
        if (err) {
            return next(err);
        }
        if (album) {
            return res.status(200).send({ album });
        }
    });
};
