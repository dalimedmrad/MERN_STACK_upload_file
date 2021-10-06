'use strict';
const MultipleFile = require('../models/multiplefile');

const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];
}
module.exports = {

    multipleFileUpload : async (req, res, next) => {
        try{
            let filesArray = [];
            req.files.forEach(element => {
                const file = {
                    fileName: element.originalname,
                    filePath: element.path,
                    fileType: element.mimetype,
                    fileSize: fileSizeFormatter(element.size, 2)
                }
                filesArray.push(file);
            });
            const multipleFiles = new MultipleFile({
                files: filesArray 
            });
            await multipleFiles.save();
            res.status(201).send('Uploaded with Successfully');
        }catch(error) {
            res.status(400).send(error.message);
        }
    },

    getallMultipleFiles : async (req, res, next) => {
        try{
            const files = await MultipleFile.find();
            res.status(200).send(files);
        }catch(error) {
            res.status(400).send(error.message);
        }
    }

}
