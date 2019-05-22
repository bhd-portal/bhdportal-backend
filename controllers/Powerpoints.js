const Powerpoint = require("../models/Powerpoint");

exports.addPowerpoint = function(req, res, next) {
  const body = req.body;
  if (!body.category_id || !body.name || !body.href || !body.imageHref) {
    return res.status(422).send({ error: "חסרים פרטים" });
  }
  const powerpoint = new Powerpoint(body);
  powerpoint.save(function(err) {
    if (err) {
      return next(err);
    }
  });
  return res.status(200).send({ powerpoint });
};

exports.patchPowerpoint = function(req, res, next) {
  const { id } = req.body;
  if (!id) {
    return res.status(422).send({ error: "חסר מזהה קטגוריה" });
  }
  Powerpoint.findByIdAndUpdate(id, req.body, { new: true }, function(
    err,
    powerpoint
  ) {
    if (err) {
      res.status(404).send(err);
      return next(err);
    }
    if (powerpoint) {
      return res.status(200).send({ powerpoint });
    } else {
      return res.status(404).send({ error: "לא קיימת קטגוריה עם מזהה זה" });
    }
  });
};

exports.deletePowerpoint = function(req, res) {
  const { id } = req.query;
  if (!id) {
    return res.status(422).send({ error: "חסר מזהה קטגוריה" });
  }
  Powerpoint.findByIdAndRemove(id, function(err, powerpoint) {
    if (err) {
      return res.status(404).send(err);
    }
    if (powerpoint) {
      return res.status(200).send({ powerpoint });
    } else {
      return res.status(404).send({ error: "לא קיימת קטגוריה עם מזהה זה" });
    }
  });
};

exports.getPowerpoints = function(req, res, next) {
  const { category_id } = req.query;
  if (!category_id) {
    return res.status(422).send({ error: "חסר מזהה עמוד" });
  }

  Powerpoint.find({ category_id }, function(err, powerpoints) {
    if (err) {
      return next(err);
    }
    if (powerpoints) {
      return res.status(200).send({ powerpoints });
    }
  });
};
