const express = require('express');
const router = express.Router();
const controller = require('../controllers/file.controller');
const imgController = require('../controllers/image.controller');
const { authJwt } = require("../middleware");
const listImages = require('./../controllers/imgList.controller')
const ImgPagination = require('./../controllers/imgPagination')
// School Data 
const { getDegree, getMark, getDegree_B, getLoginData } = require('./../controllers/school.data.controller');
const { countVisits,addVisits, countLogin, addLogin } = require('../controllers/visit.count.controller');

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

  // Count Visits
  router.get('/api/addtvisit/:type',addVisits)
  router.get('/api/countvisit',countVisits)

  // Count Logins
  router.get('/api/countlgin',countLogin)
  router.post('/api/addlogin',testisStdOrAdin,addLogin)

  // Login Data
  router.get('/api/logindata',getLoginData)
  app.use(router);
}

module.exports = routes
