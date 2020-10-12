'use strict';

const express = require('express');
const router = express.Router();
const getAllQuestions = require('../util/qs.js');

router.get('/categories', async (req, res, next) => {
    let info = await getAllQuestions();
    res.status(200).json(info);
})



module.exports = router;