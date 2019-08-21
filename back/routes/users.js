var express = require('express')
var router = express.Router()
var request = require('request')
var jwt = require('jsonwebtoken')
const sql = require('../query.js')
const qs = require('qs')
router.use(express.json())

router.post('/login', function(req, res){
	res.status(200).send('hello world')
})
router.get('/kakaoLogin',function(req, res){
	request({
		headers: {
			'Authorization': req.headers.authorization
		},
		uri: `https://kauth.kakao.com/oauth/authorize?client_id=1f659f67d32a4285ede1c90ac0d2db4b&redirect_uri=https://soocore.com&response_type=code`,
		method: 'GET'
	}, function (err, res2, body) {
		res.status(200).json({code:'success', uri : res2.request.uri.href})
	});
}),
router.get('/kakaoUserInfo',function(req, res){
	if (!req.headers.authorization) {
    	return res.status(403).json({ error: 'No credentials sent!' });
	}else{
		request({
			headers: {
				'Authorization': req.headers.authorization
			},
			uri: 'https://kapi.kakao.com/v2/user/me',
			method: 'GET'
		}, function (err, res2, body) {
			console.log(body)
			let d = JSON.parse(body)
			let q = `INSERT INTO users (id, name, phoneNumber, loginType) 
			VALUES ('${d.id.toString()}', '${d.properties.nickname}', '', 'kakao') 
			ON DUPLICATE KEY UPDATE 
			id = '${d.id.toString()}', name = '${d.properties.nickname}', phoneNumber = '', loginType = 'kakao' `
		  sql(q, function (error, results, fields) {
			  if(error){
					console.error(error.message)
					res.status(401).send({message:'mysql error'})
					return true
			  }else{
					let token = jwt.sign({ id: d.id.toString()}, 'shhhhh')
					res.status(200).json({access_token:token, id:d.id.toString(), name:d.properties.nickname});
			  }
		  })
		});
	}
}),
router.post('/sendKakaoMessage',function(req, res){
	if (!req.headers.authorization) {
    return res.status(403).json({ error: 'No credentials sent!' });
	}else{
		let d = req.body
		var params = d.data
		var query = "";
		let count = 0
		for (key in params) {
				query += encodeURIComponent(key)+"="+encodeURIComponent(JSON.stringify(params[key]))
				count++
				if(count<Object.keys(params).length){
					query+="&"
				}else{
					query+="&undefined="
				}
		}
		console.log(query)
		request({
			headers: {
				'Target-Authorization':`Bearer ${d.kakaoToken}` ,
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': `KakaoAK 8a70a07b932ead6fe97cc190c7f0e6ff`,
				'cache-control': 'no-cache',
			},
			uri: `https://kapi.kakao.com/v2/api/talk/message/default/send`,
			method: 'POST',
			body: query
		}, function (err, res2, body2) {
			console.log(body2)
			res.status(200).json(JSON.parse(body2));
		})
	}
})

router.post('/getKakaoFriends',function(req, res){
	if (!req.headers.authorization) {
    return res.status(403).json({ error: 'No credentials sent!' });
	}else{
		let d = req.body
		request({
			headers: {
				'Authorization': `Bearer ${req.body.kakaoToken}`
			},
			uri: 'https://kapi.kakao.com/v1/api/talk/friends',
			method: 'GET'
		}, function (err, res2, body) {
			let d = JSON.parse(body)
			if(d.code == -402){
				request({
					headers: {
						'Authorization': `Bearer ${req.body.kakaoToken}`
					},
					uri: `https://kauth.kakao.com/oauth/authorize?client_id=1f659f67d32a4285ede1c90ac0d2db4b&redirect_uri=https://soocore.com&response_type=code&scope=${d.required_scopes.join(',')}`,
					method: 'GET'
				}, function (err, res3, body) {
					res.status(200).json({code:-402, uri : res3.request.uri.href})
				})
			}else{
				res.status(200).json(JSON.parse(body));
			}
		})
	}
})
router.post('/getKakaoTokenByCode',function(req, res){
	let d = {}
	d.grant_type = "authorization_code"
	d.client_id = "1f659f67d32a4285ede1c90ac0d2db4b"
	d.redirect_uri = "https://soocore.com"
	d.code = req.body.code
	console.log(d)
	request({
		uri: 'https://kauth.kakao.com/oauth/token',
		method: 'POST',
		form: d
	}, function (err, res2, body2) {
		body2 = JSON.parse(body2)
		console.log("#######token by code res", body2.access_token)
		res.status(200).json({kakaoToken:body2.access_token, kakaoTokenRefresh : body2.refresh_token})
	})
})
router.post('/refreshKakaoToken',function(req, res){
	if (!req.headers.authorization) {
    return res.status(403).json({ error: 'No credentials sent!' });
	}else{
		let d = {}
		d.grant_type = "refresh_token"
		d.client_id = "1f659f67d32a4285ede1c90ac0d2db4b"
		d.refresh_token = req.body.kakaoTokenRefresh
		console.log("######d:",d)
		request({
			uri: 'https://kauth.kakao.com/oauth/token',
			method: 'POST',
			form: d
		}, function (err, res2, body2) {
			body2 = JSON.parse(body2)
			console.log(body2)
			res.status(200).json({kakaoToken:body2.access_token, kakaoTokenRefresh : body2.refresh_token})
		})
	}
})







module.exports = router;