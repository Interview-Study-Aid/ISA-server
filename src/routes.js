'use strict';

const express = require('express');
const router = express.Router();
const {getAllQuestions, getByCategory} = require('../util/qs.js');
const {createUser, getUser} = require('../util/user.js');
const {addNote} = require('../util/notes.js');
const base64 = require('base-64');
const jwt = require('jsonwebtoken');
const sha256 = require('js-sha256');


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
   
    let encryptedPassword = sha256.hex(req.body.userPassword); 
    console.log(req.body.userName, 'body for dignup')
        
    let user = await createUser(req.body.userName, encryptedPassword);
    res.status(200).json(user);
})

//  checking userName and password 
router.get('/login', async (req, res, next) => {
   
    if (!req.headers.authorization) { next({'message': 'Invalid User ID/Password', 'status': 401, 'statusMessage': 'Unauthorized'}); return; }
    
    let basic = req.headers.authorization.split(' ').pop();
        
    let [userName, pass] = basic.split(':');

    let encryptedPassword = sha256.hex(pass); 
    console.log(userName, 'login user name')
    
    
    let user  = await getUser(userName, encryptedPassword);
    console.log(user.Item.userName, encryptedPassword,'useeeeeeeeeeeeeeeer')
  

    if(!user) {
         next({'message': 'Invalid User ID/Password', 'status': 401, 'statusMessage': 'Unauthorized'});
    } else{
        const token = generateAccessToken(user);
        let username = user.Item.userName;
        console.log(username, encryptedPassword,'username going back')
        res.status(200).json({username, token});
    }
})

//  generates token after got user from data base 
function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET);
}




// gets user from token and saves notes
router.post('/addNote', async (req, res, next) => {

    if(!req.body.jwt) {
        next({'message': 'Token not inclided', 'status': 401, 'statusMessage': 'Unauthorized'});
    }

    let userFromToken = decodeAccessToken(req.body.jwt).Item;
    console.log(userFromToken, "userfrom jwt");

    let savedNote = addNote(userFromToken.userName, req.body.notes)
    res.status(200).json(savedNote);

    })

function decodeAccessToken(token) {
    return jwt.verify(token, process.env.TOKEN_SECRET);
    }
 
  

// })







module.exports = router;