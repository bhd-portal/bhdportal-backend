exports.getFile = function(req, res, next) {
  const { path } = req.body;
  if (!req.path) {
    return res.status(422).send({ error: "Please add file path" });
  }
  res.download(path);
};



exports.saveFile = function(req, res, next) {
  const { category, filename } = req.body;
  if (!req.files || !category || !filename) {
    return res.status(422).send({ error: " חסר קבצים או שיוך לקטגוריה" });
  }
  const file = req.files.file;
  const path = __dirname + "/public/" + category + "/" + filename;
  file.mv(path, err => {
    if (err) {
      return res.status(500);
    }
  });
  return res.status(200).json({ path });
};
