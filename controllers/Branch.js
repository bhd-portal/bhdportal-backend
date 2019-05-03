const Branch = require("../models/Branch");

exports.addBranch = function(req, res, next) {
  const body = req.body;
  if (!body.name || !body.imageURL) {
    return res.status(422).send({ error: "חסרים פרטים" });
  }
  const branch = new Branch(body);
  branch.save(function(err) {
    if (err) {
      return next(err);
    }
  });
  return res.status(200).send({ branch });
};

exports.patchBranch = function(req, res, next) {
  const { id } = req.body;
  if (!id) {
    return res.status(422).send({ error: "חסר מזהה קטגוריה" });
  }
  Branch.findByIdAndUpdate(id, req.body, { new: true }, function(err, branch) {
    if (err) {
      res.status(404).send(err);
      return next(err);
    }
    if (branch) {
      return res.status(200).send({ branch });
    } else {
      return res.status(404).send({ error: "לא קיימת קטגוריה עם מזהה זה" });
    }
  });
};

exports.deleteBranch = function(req, res) {
  const { id } = req.query;
  if (!id) {
    return res.status(422).send({ error: "חסר מזהה קטגוריה" });
  }
  Branch.findByIdAndRemove(id, function(err, branch) {
    if (err) {
      return res.status(404).send(err);
    }
    if (branch) {
      return res.status(200).send({ branch });
    } else {
      return res.status(404).send({ error: "לא קיימת קטגוריה עם מזהה זה" });
    }
  });
};

exports.getBranchs = function(req, res, next) {
  const { id } = req.query;
  if (id) {
    Branch.findById(id, function(err, branch) {
      if (err) {
        return next(err);
      }
      if (branch) {
        return res.status(200).send({ branch });
      }
    });
  } else {
    Branch.find({}, function(err, branches) {
      if (err) {
        return next(err);
      }
      if (branches) {
        return res.status(200).send({ branches });
      }
    });
  }
};
