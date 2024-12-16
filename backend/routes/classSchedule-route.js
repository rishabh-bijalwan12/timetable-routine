const express = require('express');
const { createClassRoutine, updateRoutine, GetClassDetails } = require('../controllers/createClassController');
const router = express.Router();

// Route for creating class routine
router.post('/createClass', createClassRoutine);

// Route for updating class routine
router.put('/updateClass', updateRoutine);

// Route to get class routine
router.get('/GetClassDetails', GetClassDetails);

module.exports = router;
