const express = require('express')
const app = express()
var router = express.Router()
const Q = require('q')
const multer = require('multer')
const sql = require('../query.js')

var upload = function (req, res) {
    var deferred = Q.defer();
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './uploads/');
      },
  
      filename: function (req, file, cb) {
        file.uploadedFile = {
          name: req.params.filename,
          ext: file.mimetype.split('/')[1]
        };
        cb(null, file.uploadedFile.name + '.' + file.uploadedFile.ext);
      }
    });
    var upload = multer({ storage: storage }).single('sign');
    upload(req, res, function (err) {
      if (err) deferred.reject();
      else deferred.resolve(req.file.uploadedFile);
    });
    return deferred.promise;
  };
  router.post('/:filename', function(req, res, next) {
    upload(req, res).then(function (file) {
		console.log(file.name)
		let sectionId = file.name.split('_')[0]
		let type = file.name.split('_')[1]
		let url = `https://api.soocore.com/uploads/${file.name}`
		let q = `UPDATE sections SET ${type}_sign='${url}' WHERE id = '${sectionId}'` 
		sql(q,function (error, results, fields) {
			if(error){
				console.error(error.message)
				res.status(403).send({message:'mysql error'})
				return true
			}else{
				console.log("#####results",results)
				res.status(200).json({data:results})
			}
		})
    }, function (err) {
      res.send(500, err);
    })
  })
  module.exports = router;