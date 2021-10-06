'use strict';

const express = require('express');
const {upload} = require('../helpers/filehelper');
const {multipleFileUpload, getallMultipleFiles} = require('../controllers/fileuploaderController');
const router = express.Router();


router.post('/multipleFiles', upload.array('files'), multipleFileUpload);
router.get('/getMultipleFiles', getallMultipleFiles);


module.exports = {
    routes: router
}