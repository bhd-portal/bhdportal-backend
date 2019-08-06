const Product = require("../models/Product");

exports.addProduct = function(req, res, next) {
  const body = req.body;
  if (
    !body.title ||
    !body.subcategory_id ||
    !body.content ||
    !body.avatar_file_id ||
    !body.link
  ) {
    return res.status(422).send({ error: "חסרים פרטים" });
  }
  const product = new Product(body);
  product.save(function(err) {
    if (err) {
      return next(err);
    }
  });
  return res.status(200).send({ product });
};

exports.patchProduct = function(req, res, next) {
  const { id } = req.body;
  if (!id) {
    return res.status(422).send({ error: "חסר מזהה קטגוריה" });
  }
  Product.findByIdAndUpdate(id, req.body, { new: true }, function(
    err,
    product
  ) {
    if (err) {
      res.status(404).send(err);
      return next(err);
    }
    if (product) {
      return res.status(200).send({ product });
    } else {
      return res.status(404).send({ error: "לא קיימת קטגוריה עם מזהה זה" });
    }
  });
};

exports.deleteProduct = function(req, res) {
  const { id } = req.query;
  if (!id) {
    return res.status(422).send({ error: "חסר מזהה קטגוריה" });
  }
  Product.findByIdAndRemove(id, function(err, product) {
    if (err) {
      return res.status(404).send(err);
    }
    if (product) {
      return res.status(200).send({ product });
    } else {
      return res.status(404).send({ error: "לא קיימת קטגוריה עם מזהה זה" });
    }
  });
};

exports.getProducts = function(req, res, next) {
  const { subcategory_id } = req.query;
  if (!subcategory_id) {
    return res.status(422).send({ error: "חסר מזהה עמוד" });
  }

  Product.find({ subcategory_id }, function(err, products) {
    if (err) {
      return next(err);
    }
    if (products) {
      return res.status(200).send({ products });
    }
  });
};
