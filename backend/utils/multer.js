// utils/multer.js
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'uploads'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  cb(null, path.extname(file.originalname) === '.zip'); // only ZIP
};

module.exports = multer({ storage, fileFilter });
