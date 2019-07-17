var express = require('express')
var router = express.Router()
const sql = require('../query.js')

router.post('/login', function(req, res){
	var param='';
    req.on('data', function(data) {
      param += data;
	});	
	req.on('end', function() {
		try {
			console.log(param)
		  var body = JSON.parse(param)
		  console.log(body)
		  if(!body.id){
			res.status(401).send({message:'id is not exist'})
			return true
		  }
		  if(!body.name){
			res.status(401).send({message:'name is not exist'})
			return true
		  }
		  let q = `INSERT INTO users (id, name, phoneNumber) VALUES ('${body.id}', '${body.name}', '${body.phoneNumber}') WHERE NOT EXISTS (SELECT * FROM users WHERE id = '${body.id}')`
		  console.log(q)
		  sql(q,function (error, results, fields) {
			  if(error){
				res.status(401).send({message:'mysql error'})
				return true
			  }else{
				res.json({message:'success'})
			  }
		  })
		} catch (e) {
			console.log(e.message)
			res.status(500).json({message:'server error!'})
			return true
		}
	  })
})

router.get('/kakaoUserInfo',function(req, res){
	if (!req.headers.authorization) {
    return res.status(403).json({ error: 'No credentials sent!' });
	}
	console.log(req.headers.authorization)
})






module.exports = router;