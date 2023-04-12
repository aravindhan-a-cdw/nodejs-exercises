// Imports
const { Router } = require('express');
const { buddyGetController, buddyGetAllController, buddyCreateController, buddyUpdateController, buddyDeleteController } = require('../controllers/buddy.controllers');


const router = Router();

// Get all buddies Data
router.get('/', buddyGetAllController);

// Get a single buddy data by passing id as path parameter
router.get('/:id', buddyGetController);

// Create a new buddy by sending data through post method
router.post('/', buddyCreateController);

// Update a buddy by passing id in path and data in body
router.put('/:id', buddyUpdateController);

// Delete a buddy by passing id in path
router.delete('/:id', buddyDeleteController);

module.exports = router;