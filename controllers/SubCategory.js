const SubCategory = require("../models/SubCategory");

exports.addSubCategory = function(req, res, next) {
  const body = req.body;
  if (!body.name || !body.category_id) {
    return res.status(422).send({ error: "חסר פרטים" });
  }
  const subcategory = new SubCategory(body);
  subcategory.save(function(err) {
    if (err) {
      return next(err);
    }
  });
  return res.status(200).send({ subcategory });
};

exports.patchSubCategory = function(req, res, next) {
  const { id } = req.body;
  if (!id) {
    return res.status(422).send({ error: "חסר מזהה קטגוריה" });
  }
  SubCategory.findByIdAndUpdate(id, req.body, { new: true }, function(
    err,
    subcategory
  ) {
    if (err) {
      res.status(404).send(err);
      return next(err);
    }
    if (subcategory) {
      return res.status(200).send({ subcategory });
    } else {
      return res.status(404).send({ error: "לא קיימת קטגוריה עם מזהה זה" });
    }
  });
};

exports.deleteSubCategory = function(req, res) {
  const { id } = req.query;
  if (!id) {
    return res.status(422).send({ error: "חסר מזהה קטגוריה" });
  }
  SubCategory.findByIdAndRemove(id, function(err, subcategory) {
    if (err) {
      return res.status(404).send(err);
    }
    if (subcategory) {
      return res.status(200).send({ subcategory });
    } else {
      return res.status(404).send({ error: "לא קיימת קטגוריה עם מזהה זה" });
    }
  });
};

exports.getSubCategories = function(req, res, next) {
  const { category_id } = req.query;
  if (!category_id) {
    return res.status(422).send({ error: "חסר מזהה קטגוריה" });
  }

  SubCategory.find({ category_id }, function(err, categories) {
    if (err) {
      return next(err);
    }
    if (categories) {
      return res.status(200).send({ categories });
    }
  });
};
