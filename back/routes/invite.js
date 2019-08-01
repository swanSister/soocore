var express = require('express')
var router = express.Router()
var request = require('request');
var jwt = require('jsonwebtoken');
const sql = require('../query.js')

router.use(express.json())

router.post('/get',function(req, res){
	if (!req.headers.authorization) {
    	return res.status(401).json({ error: 'No credentials sent!' });
	}else{
		let d = req.body
		let verified = {}
		try{
			verified = jwt.verify(req.headers.authorization, 'shhhhh')
		}catch(e){
			return res.status(401).json({ error: 'relogin' });
		}

		let q = `SELECT * FROM sections WHERE id='${d.id}'`
		sql(q,function (error, results, fields) {
			if(error){
				console.error(error.message)
				res.status(403).send({message:'mysql error'})
				return true
			}else{
				console.log("#####results",results)
				res.status(200).json({data:results});
			}
		})
	}
})

router.post('/set',function(req, res){
	if (!req.headers.authorization) {
    return res.status(401).json({ error: 'No credentials sent!' });
	}else{
		let verified = {}
		try{
			verified = jwt.verify(req.headers.authorization, 'shhhhh')
		}catch(e){
			return res.status(401).json({ error: 'relogin' });
		}
	}
})






module.exports = router;