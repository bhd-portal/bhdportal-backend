const path = require("path");
const fs = require("fs");

exports.getFile = function(req, res, next) {
  console.log(req);
  const { path } = req.body;
  if (!req.path) {
    return res.status(422).send({ error: "Please add file path" });
  }
  res.download(path);
};

exports.saveFile = function(req, res, next) {
  const { category, filename } = req.body;
  if (!req.files || !category || !filename) {
    return res.status(422).send({ error: " חסר קבצים או שיוך לקטגוריה" + req.files });
  }
  const file = req.files.file;
  const file_path = path.join(category, filename);
  const save_path = path.join(
    __dirname,
    "..",
    "..",
    "bhdportal",
    "public",
    category
  );
  if (!fs.existsSync(save_path)) {
    fs.mkdirSync(save_path);
  }
  file.mv(path.join(save_path, filename), err => {
    if (err) {
      return res.status(500);
    }
  });
  return res.status(200).json({ path: file_path });
};
