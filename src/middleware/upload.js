const util = require("util");
const multer = require("multer");
const maxSize = 5 * 1024 * 1024
const maxVidioSize = 100 * 1024 * 1024

const path = require('path');


let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/resources/static/assets/files/");
  },
  filename: async (req, file, cb) => {
    console.log(file.originalname);
    cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
  }
});

let storageImage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/public/static/uploads/images");
  },
  filename: async (req, file, cb) => {
    cb(null, "IMG" + '-' + Date.now() + '.' + file.mimetype.split('image/').join(''));
  }
});


let storageVidio = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/public/static/uploads/videos");
  },
  filename: async (req, file, cb) => {
    cb(null, "Vidio" + '-' + Date.now() + '.' + file.mimetype.split('video/').join(''));
  }
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadImage = multer({
  storage: storageImage,
  limits: { fileSize: maxSize },
}).single("image");

let uploadVidio = multer({
  storage: storageVidio,
  limits: { fileSize: maxVidioSize }
}).single('video')

let uploadFileMiddleware = util.promisify(uploadFile);
let uploadImageMiddleware = util.promisify(uploadImage);
let uploadVidioMiddleware = util.promisify(uploadVidio)

module.exports = {
  uploadFileMiddleware,
  uploadImageMiddleware,
  uploadVidioMiddleware,
};