'use strict';

const express = require('express');
const router = express.Router();
const {getAllQuestions, getByCategory} = require('../util/qs.js');
const {createUser, getUser} = require('../util/user.js');
const {addNote} = require('../util/notes.js');
const base64 = require('base-64');
const jwt = require('jsonwebtoken');

// for categories with all questions and answers
router.get('/categories', async (req, res, next) => {
    let info = await getAllQuestions();
    res.status(200).json(info);
})

// for categories sorted by name with questions in this category
router.get('/categories/:name', async (req, res, next) => {
    let info = await getByCategory(req.params.name);
    res.status(200).json(info);
})


// for signup user (save userName + password ) 
router.post('/signup', async (req, res, next) => {
    let user = await createUser(req.body.userName, req.body.userPassword);
    res.status(200).json(user);
})

//  checking userName and password 
router.get('/login', async (req, res, next) => {
      console.log(req.headers.authorization, 'header auth')
    if (!req.headers.authorization) { next({'message': 'Invalid User ID/Password', 'status': 401, 'statusMessage': 'Unauthorized'}); return; }
    
    let basic = req.headers.authorization.split(' ').pop();

    // console.log(basic, 'baaaasic')
        
    let [userName, pass] = base64.decode(basic).split(':');

    // console.log(userName, pass, 'here is pass an name')
    
    let user  = await getUser(userName, pass);

    // console.log(user, 'useeeeer')
    if(!user) {
         next({'message': 'Invalid User ID/Password', 'status': 401, 'statusMessage': 'Unauthorized'});
    } else{
        const token = generateAccessToken(user);

    // console.log(token, 'toooken')
        res.status(200).json({user, token});
    }
})

//  generates token after got user from data base 
function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET);
}


// gets user from token and saves notes
router.post('/addNote', async (req, res, next) => {

})



module.exports = router;