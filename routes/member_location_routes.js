const express = require('express');
const MemberLocationController = require('../controllers/member_location_controller');

const router = express.Router();

router.get('/', async (req, res) => console.log('member_location_controller'));

module.exports = router;
