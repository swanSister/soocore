var express = require('express')
var router = express.Router()
var request = require('request');
var jwt = require('jsonwebtoken');
const sql = require('../query.js')
const uniqid = require('uniqid');

router.use(express.json())

router.post('/get',function(req, res){
	if (!req.headers.authorization) {
    	return res.status(401).json({ error: 'No credentials sent!' });
	}else{
		let verified = {}
		try{
			verified = jwt.verify(req.headers.authorization, 'shhhhh')
		}catch(e){
			return res.status(401).json({ error: 'relogin' });
		}
		let d = req.body
		let q = `SELECT * FROM score WHERE sectionId='${d.sectionId}' AND isAccept=1`
		sql(q,function (error, results, fields) {
			if(error){
				res.status(403).send({message:'mysql error'})
				return true
			}else{
				res.status(200).json({data:results});
			}
		})
	}
})

router.post('/getWait',function(req, res){
	if (!req.headers.authorization) {
    	return res.status(401).json({ error: 'No credentials sent!' });
	}else{
		let verified = {}
		try{
			verified = jwt.verify(req.headers.authorization, 'shhhhh')
		}catch(e){
			return res.status(401).json({ error: 'relogin' });
		}
		let d = req.body
		let q = `SELECT * FROM score WHERE sectionId='${d.sectionId}' AND isAccept=0`
		sql(q,function (error, results, fields) {
			if(error){
				console.error(error.message)
				res.status(403).send({message:'mysql error'})
				return true
			}else{
				res.status(200).json({data:results});
			}
		})
	}
})

router.post('/create',function(req, res){
	if (!req.headers.authorization) {
    return res.status(401).json({ error: 'No credentials sent!' });
	}else{
		let verified = {}
		try{
			verified = jwt.verify(req.headers.authorization, 'shhhhh')
		}catch(e){
			return res.status(401).json({ error: 'relogin' });
		}
		let d = req.body
		let id = uniqid()
	
		let q = `INSERT INTO score (id, sectionId, timestamp, isAccept, 
			todo, score)
			VALUES ('${id}', '${d.sectionId}', '${Math.floor((Date.now()/1000)).toString()}', ${d.isAccept}, 
			'${d.todo}', '${d.score}')`

		sql(q,function (error, results, fields) {
			if(error){
				console.error(error.message)
				res.status(403).send({message:'mysql error'})
				return true
			}else{
				if(d.isAccept){
					let q = `UPDATE sections SET score=(SELECT SUM(score) from score WHERE sectionId = '${d.sectionId}' AND isAccept=1) WHERE id='${d.sectionId}'`
					sql(q,function (error, results, fields) {
						if(error){
							console.error(error.message)
							res.status(403).send({message:'mysql error'})
							return true
						}else{
							res.status(200).json({code:'success',data:{
								id: id
							}});
						}
					})
				}else{
					res.status(200).json({code:'success',data:{
						id: id
					}});
				}
			}
		})
	}
})

router.post('/approve',function(req, res){
	if (!req.headers.authorization) {
    	return res.status(401).json({ error: 'No credentials sent!' });
	}else{
		let verified = {}
		try{
			verified = jwt.verify(req.headers.authorization, 'shhhhh')
		}catch(e){
			return res.status(401).json({ error: 'relogin' });
		}
		let d = req.body
		let id = uniqid()
	
		let q = `UPDATE score SET isAccept=1 WHERE id='${d.id}'`
		sql(q,function (error, results, fields) {
			if(error){
				console.error(error.message)
				res.status(403).send({message:'mysql error'})
				return true
			}else{
				let q = `UPDATE sections SET score=(SELECT SUM(score) from score WHERE sectionId = '${d.sectionId}' AND isAccept=1) WHERE id='${d.sectionId}'`
				sql(q,function (error, results, fields) {
					if(error){
						console.error(error.message)
						res.status(403).send({message:'mysql error'})
						return true
					}else{
						res.status(200).json({code:'success',data:{
							id: id
						}});
					}
				})
			}
		})
	}
})

router.post('/delete',function(req, res){
	if (!req.headers.authorization) {
    	return res.status(401).json({ error: 'No credentials sent!' });
	}else{
		let verified = {}
		try{
			verified = jwt.verify(req.headers.authorization, 'shhhhh')
		}catch(e){
			return res.status(401).json({ error: 'relogin' });
		}
		let d = req.body
		let id = uniqid()
	
		let q = `DELETE FROM score WHERE id='${d.id}'`
		sql(q,function (error, results, fields) {
			if(error){
				console.error(error.message)
				res.status(403).send({message:'mysql error'})
				return true
			}else{
				let q = `UPDATE sections SET score=(SELECT SUM(score) from score WHERE sectionId = '${d.sectionId}' AND isAccept=1) WHERE id='${d.sectionId}'`
				sql(q,function (error, results, fields) {
					if(error){
						console.error(error.message)
						res.status(403).send({message:'mysql error'})
						return true
					}else{
						res.status(200).json({code:'success',data:{
							id: id
						}});
					}
				})
			}
		})
	}
})





module.exports = router;