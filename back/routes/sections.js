var express = require('express')
var router = express.Router()
var request = require('request');
var jwt = require('jsonwebtoken');
const sql = require('../query.js')
const uniqid = require('uniqid');
const fs = require('fs');

router.use(express.json())


router.get('/get',function(req, res){
	if (!req.headers.authorization) {
    return res.status(401).json({ error: 'No credentials sent!' });
	}else{
		let verified = {}
		try{
			verified = jwt.verify(req.headers.authorization, 'shhhhh')
		}catch(e){
			return res.status(401).json({ error: 'relogin' });
		}

		let q = `SELECT * FROM sections WHERE a_id = '${verified.id}' OR b_id = '${verified.id}'`
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
router.post('/detail',function(req, res){
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
		let q = `SELECT * FROM sections WHERE id = '${d.id}'`
		sql(q,function (error, results, fields) {
			if(error){
				console.error(error.message)
				res.status(403).send({message:'mysql error'})
				return true
			}else{
				res.status(200).json({data:results[0]});
			}
		})
	}
})
router.post('/accept',function(req, res){
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

		if(!d.a_id) {
			d.a_id = verified.id
		}else{
			d.b_id = verified.id
		}
	
		let q = `UPDATE sections SET 
		isCreate=true,
		a_id='${d.a_id}', b_id='${d.b_id}', 
		a_name='${d.a_name}', b_name='${d.b_name}' WHERE id='${d.id}'`

		sql(q,function (error, results, fields) {
			if(error){
				console.error(error.message)
				res.status(403).send({message:'mysql error'})
				return true
			}else{
				res.status(200).json({code:'success'});
			}
		})
	}
})

router.post('/create',function(req, res){
	if (!req.headers.authorization) {
    return res.status(401).json({ error: 'No credentials sent!' });
	}else{
		let d = req.body
		let id = uniqid()
		let verified = {}
		try{
			verified = jwt.verify(req.headers.authorization, 'shhhhh')
		}catch(e){
			return res.status(401).json({ error: 'relogin' });
		}
		let a_id = ''
		let b_id = ''
		if(d.role == 1) {
			a_id = verified.id
		}else{
			b_id = verified.id
		}
	
		let q = `INSERT INTO sections (id, timestamp, endtime, isCreate, 
			a_name, a_id, b_name, b_id, goal, goalpoint, score)
			VALUES ('${id}', '${Math.floor((Date.now()/1000)).toString()}', '${d.endtime}', ${d.isCreate}, 
			'${d.a_name}', '${a_id}', '${d.b_name}', '${b_id}', '${d.goal}', ${d.goalpoint}, 0)`

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

		let q = `DELETE FROM sections WHERE id='${d.id}'`
		sql(q,function (error, results, fields) {
			if(error){
				console.error(error.message)
				res.status(403).send({message:'mysql error'})
				return true
			}else{
				let q2 = `DELETE FROM score WHERE sectionId='${d.id}'`
				sql(q2, function(error, results, fields){
					if(error){
						console.error(error.message)
					}
				})
				fs.exists(`./uploads/${d.id}_a.png`, function(exists) {
					if(exists) {
						fs.unlink(`./uploads/${d.id}_a.png`, function(err){
							if(err){
								console.error(err)
							}else{
								fs.exists(`./uploads/${d.id}_b.png`, function(exists) {
									if(exists) {
										fs.unlink(`./uploads/${d.id}_b.png`, function(err){
											if(err){
												console.error(err)
											}
										})
									} else {
										console.log("not found file@@@!!!@!@!@!@!@");
									}
								})
							}
						})
					} else {
						console.log("not found file@@@!!!@!@!@!@!@");
					}
				})
				res.status(200).json({code:'success'});
			}
		})
	}
})






module.exports = router;