const File = require("../models/File");
const contentDisposition = require('content-disposition');

exports.addFile = function(req, res, next) {
  const files = req.files;
  const { category, filename } = req.body

  if (!files || !files.file) {
    return res.status(422).send({ error: "לא מצורף קובץ" });
  }

  if (files.length > 1) {
    return res.status(422).send({ error: "העלאה מרובה של קבצים לא אפשרית!" });
  }

  if (!category || !filename) {
    return res.status(422).send({ error: " חסרים פרטים על הקובץ"});
  }

  files.file.filename = filename;
  files.file.category = category;

  const file = new File(files.file);
  file.save(function(err) {
    if (err) {
      return next(err);
      }
    });

  return res.status(200).json({ id: file._id });
};

exports.patchFile = function(req, res, next) {
  const { id } = req.body;
  if (!id) {
    return res.status(422).send({ error: "חסר מזהה קובץ" });
  }
  File.findByIdAndUpdate(id, req.body, { new: true }, function(
      err,
      file
  ) {
    if (err) {
      res.status(404).send(err);
      return next(err);
    }
    if (file) {
      res.set('Content-Disposition', contentDisposition(file.filename));
      return res.status(200).send(file.data);
    } else {
      return res.status(404).send({ error: "לא קיים קובץ עם מזהה זה" });
    }
  });
};

exports.deleteFile = function(req, res) {
  const { id } = req.query;
  if (!id) {
    return res.status(422).send({ error: "חסר מזהה קובץ" });
  }
  File.findByIdAndRemove(id, function(err, file) {
    if (err) {
      return res.status(404).send(err);
    }
    if (file) {
      return res.status(200).send('הקובץ עם המזהה ' + id + 'נמחק!');
    } else {
      return res.status(404).send({ error: "לא קיים קובץ עם מזהה זה" });
    }
  });
};

exports.getFile = function(req, res, next) {
  const { id } = req.query;

  if (!id){
    return res.status(422).send({ error: "חסר id של קובץ" });
  }

  File.findById(id, function(err, file) {
    if (err) {
      return next(err);
    }
    if (file) {
      res.set('Content-Disposition', contentDisposition(file.filename));
      return res.status(200).send(file.data);
    } else {
      return res.status(404).send({ error: "לא קיים קובץ עם מזהה זה" });
    }
  });
};
