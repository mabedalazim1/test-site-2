const express = require('express');
const router = express.Router();
const controller = require('../controllers/file.controller');
const imgController = require('../controllers/image.controller');
const { authJwt, uploadExcel } = require("../middleware");
const listImages = require('./../controllers/imgList.controller')
const ImgPagination = require('./../controllers/imgPagination')
// School Data 
const { getDegree, getMark, getDegree_B } = require('./../controllers/school.data.controller');
const { countVisits,addVisits, countLogin, addLogin ,loginData } = require('../controllers/visit.count.controller');
const { LoginData } = require('../models/school.model');

// Excel Files
const excelController = require("./../controllers/excel.controller");

// Send Notifications
const notifications = require ("./../controllers/notifications.controller");

const testAdmin = [authJwt.verifyToken, authJwt.isAdmin]
const testisStdOrAdin = [authJwt.verifyToken, authJwt.isStdOrAdmin]
let routes = app => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Upload Files
  router.post('/api/upload', testAdmin, controller.upload);
  router.get('/api/files', controller.getListFiles);
  router.get('/api/files/:name', controller.download);
  router.delete('/api/files/:name', testAdmin, controller.deleteFile);

  // Upload Images
  router.post('/api/uploadimages', testAdmin, controller.uploadImage);
  router.get('/api/images', imgController.getListImages);
  router.get('/api/testimages', imgController.testImg);
  router.get('/api/listimages', listImages.getList);
  router.get('/api/groupimages/:secid/', listImages.groupImages);
  router.get('/api/listimages/:secid/', listImages.getListById);
  router.get('/api/images/:name', imgController.downloadImage);
  router.delete('/api/images/:name', testAdmin, imgController.deleteImage);

// Upload Vidio
router.post('/api/uploadvidio', testAdmin, controller.uploadVidio)

  // Get imgCatogery By imgSection
  router.get('/api/imgcatsection', testAdmin, listImages.getCatBySection);
  // Get imgData By Catogery
router.get('/api/imgcatdata', listImages.getAllDataCatogery)
router.get('/api/imgcatdata/:catid/', listImages.getDataByCatogery)
// Get Img Pagination
router.get('/api/imgpagination/:secid/', ImgPagination.getImgPagination)
 
// Test School Data
router.get('/api/degree/:stdId/:testKindId/', testisStdOrAdin, getDegree)
router.get('/api/degree_b/:stdId/:testKindId/', testisStdOrAdin, getDegree_B)
router.get('/api/mark/:stdId/:testKindId/', testisStdOrAdin, getMark)
router.get('/api/getListInfoById/:secid/:classid/',testisStdOrAdin, listImages.getListInfoById)

  // Test Api
  router.get('/api/test', function (req, res) {
    res.send('API is working properly Kps School');
  });

  
// Excel Router
router.post("/api/upload/student",testAdmin, uploadExcel.single("file"), excelController.upload_student);
router.post("/api/upload/degree",testAdmin, uploadExcel.single("file"), excelController.upload_degree);
router.post("/api/upload/mark",testAdmin, uploadExcel.single("file"), excelController.upload_mark);
router.post("/api/upload/phrase", testAdmin,uploadExcel.single("file"), excelController.upload_phrase);
router.get("/api/excel", excelController.getTArabic);
router.get("/api/getuser", excelController.getUsers);


  // Count Visits
  router.get('/api/addtvisit/:type',addVisits)
  router.get('/api/countvisit',countVisits)

  // Count Logins
  router.get('/api/countlgin',countLogin)
  router.post('/api/addlogin',testisStdOrAdin,addLogin)

  // Login Data
  router.get('/api/logindata',testAdmin,loginData)

  // Send Notifications
  router.post('/api/subscribe',notifications.subscribe) 
  router.post('/api/update_subscribe',notifications.update_subscribe)
  router.post('/api/sendNotification',notifications.sendNotification)
  
  app.use(router);

}

module.exports = routes
