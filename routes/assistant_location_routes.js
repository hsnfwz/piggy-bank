const express = require('express');
const AssistantLocationController = require('../controllers/assistant_location_controller');

const router = express.Router();

router.get('/', async (req, res) => console.log('assistant_location_controller'));

module.exports = router;
