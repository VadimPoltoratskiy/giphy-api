const express = require('express')

const feedController = require('../controllers/feed')

const router = express.Router();

// GET /feed/cards
router.get('/cards', feedController.getCards);

// GET /feed/cards/:id
router.get('/cards/:cardId', feedController.getCard)

// PUT /feed/cards/:cardId
router.put('/cards/:cardId', feedController.likeCard)

// GET /feed/history
router.get('/history', feedController.getHistory)

module.exports = router;