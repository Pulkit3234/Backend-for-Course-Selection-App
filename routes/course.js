
const express = require('express');

const router = express.Router();

const courseController = require('../controllers/course');


router.post('/', courseController.register);
router.get('/', courseController.fetch);
module.exports = router;