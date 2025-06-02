const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const alloewdTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (alloewdTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpeg .jpg & .png foemats files are allowed"));
  }
};

const upload = multer({storage,fileFilter});
module.exports = upload;