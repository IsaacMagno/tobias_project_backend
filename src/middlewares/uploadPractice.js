const multer = require("multer");

module.exports = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, callback) => {
      callback(null, "public/practice");
    },
    filename: (_req, file, callback) => {
      callback(null, Date.now() + "-" + file.originalname);
    },
  }),
});
