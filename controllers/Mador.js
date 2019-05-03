const Mador = require("../models/Mador");

exports.addMador = function(req, res, next) {
  const body = req.body;
  console.log(!body.name);
  if (
    !body.name ||
    !body.branch_id ||
    !body.content ||
    !body.imageURL ||
    !body.description
  ) {
    console.log(!body.name);
    return res.status(422).send({ error: "חסרים פרטים" });
  }
  const mador = new Mador(body);
  mador.save(function(err) {
    if (err) {
      return next(err);
    }
  });
  return res.status(200).send({ mador });
};

exports.patchMador = function(req, res, next) {
  const { id } = req.body;
  if (!id) {
    return res.status(422).send({ error: "חסר מזהה קטגוריה" });
  }
  Mador.findByIdAndUpdate(id, req.body, { new: true }, function(err, mador) {
    if (err) {
      res.status(404).send(err);
      return next(err);
    }
    if (mador) {
      return res.status(200).send({ mador });
    } else {
      return res.status(404).send({ error: "לא קיימת קטגוריה עם מזהה זה" });
    }
  });
};

exports.deleteMador = function(req, res) {
  const { id } = req.query;
  if (!id) {
    return res.status(422).send({ error: "חסר מזהה קטגוריה" });
  }
  Mador.findByIdAndRemove(id, function(err, mador) {
    if (err) {
      return res.status(404).send(err);
    }
    if (mador) {
      return res.status(200).send({ mador });
    } else {
      return res.status(404).send({ error: "לא קיימת קטגוריה עם מזהה זה" });
    }
  });
};

exports.getMadors = function(req, res, next) {
  const { branch_id } = req.query;
  if (!branch_id) {
    return res.status(422).send({ error: "חסר מזהה עמוד" });
  }

  Mador.find({ branch_id }, function(err, madorim) {
    if (err) {
      return next(err);
    }
    if (madorim) {
      return res.status(200).send({ madorim });
    }
  });
};
