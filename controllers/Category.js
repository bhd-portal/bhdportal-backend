const Category = require("../models/Category");

exports.addCategory = function(req, res, next) {
  const body = req.body;
  if (!body.name || !body.page_ref) {
    return res.status(422).send({ error: "חסר שם קטגוריה או מזהה עמוד" });
  }
  const category = new Category(body);
  category.save(function(err) {
    if (err) {
      return next(err);
    }
  });
  return res.status(200).send({ category });
};

exports.patchCategory = function(req, res, next) {
  const { id } = req.body;
  if (!id) {
    return res.status(422).send({ error: "חסר מזהה קטגוריה" });
  }
  Category.findByIdAndUpdate(id, req.body, { new: true }, function(
    err,
    category
  ) {
    if (err) {
      res.status(404).send(err);
      return next(err);
    }
    if (category) {
      return res.status(200).send({ category });
    } else {
      return res.status(404).send({ error: "לא קיימת קטגוריה עם מזהה זה" });
    }
  });
};

exports.deleteCategory = function(req, res) {
  const { id } = req.query;
  if (!id) {
    return res.status(422).send({ error: "חסר מזהה קטגוריה" });
  }
  Category.findByIdAndRemove(id, function(err, category) {
    if (err) {
      return res.status(404).send(err);
    }
    if (category) {
      return res.status(200).send({ category });
    } else {
      return res.status(404).send({ error: "לא קיימת קטגוריה עם מזהה זה" });
    }
  });
};

exports.getCategories = function(req, res, next) {
  const { page_ref } = req.query;
  if (!page_ref) {
    return res.status(422).send({ error: "חסר מזהה עמוד" });
  }

  Category.find({ page_ref }, function(err, categories) {
    if (err) {
      return next(err);
    }
    if (categories) {
      return res.status(200).send({ categories });
    }
  });
};
