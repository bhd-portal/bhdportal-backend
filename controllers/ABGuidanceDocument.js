const ABGuidanceDocument = require("../models/ABGuidanceDocument");

exports.addDocument = function(req, res, next) {
  const body = req.body;
  console.log("1");
  if (!body.subcategory_id || !body.name || !body.href) {
    return res.status(422).send({ error: "חסרים פרטים" });
  }
  const document = new ABGuidanceDocument(body);
  document.save(function(err) {
    if (err) {
      return next(err);
    }
  });
  return res.status(200).send({ document });
};

exports.patchDocument = function(req, res, next) {
  const { id } = req.body;
  if (!id) {
    return res.status(422).send({ error: "חסר מזהה קטגוריה" });
  }
  ABGuidanceDocument.findByIdAndUpdate(id, req.body, { new: true }, function(
    err,
    document
  ) {
    if (err) {
      res.status(404).send(err);
      return next(err);
    }
    if (document) {
      return res.status(200).send({ document });
    } else {
      return res.status(404).send({ error: "לא קיימת קטגוריה עם מזהה זה" });
    }
  });
};

exports.deleteDocument = function(req, res) {
  const { id } = req.query;
  if (!id) {
    return res.status(422).send({ error: "חסר מזהה קטגוריה" });
  }
  ABGuidanceDocument.findByIdAndRemove(id, function(err, document) {
    if (err) {
      return res.status(404).send(err);
    }
    if (document) {
      return res.status(200).send({ document });
    } else {
      return res.status(404).send({ error: "לא קיימת קטגוריה עם מזהה זה" });
    }
  });
};

exports.getDocuments = function(req, res, next) {
  const { subcategory_id } = req.query;
  if (!subcategory_id) {
    return res.status(422).send({ error: "חסר מזהה עמוד" });
  }

  ABGuidanceDocument.find({ subcategory_id }, function(err, documents) {
    if (err) {
      return next(err);
    }
    if (documents) {
      return res.status(200).send({ documents });
    }
  });
};
