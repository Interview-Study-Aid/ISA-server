'use strict';

const express = require('express');
const router = express.Router();
const getAllQuestions = require('../util/qs.js');
const {createUser} = require('../util/user.js')

router.get('/categories', async (req, res, next) => {
    let info = await getAllQuestions();
    res.status(200).json(info);
})

router.post('/signup', async (req, res, next) => {
    console.log(req.body)
    let user = await createUser(req.body.userName, req.body.userPassword);
    res.status(200).json(user);
})

// router.get('/login', async (req, res, next) => {
//     let info = await getAllQuestions();
//     res.status(200).json(info);
// })



module.exports = router;