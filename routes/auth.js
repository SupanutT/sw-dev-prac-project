/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *         firstName:
 *         lastName:
 *         phoneNumber:
 *         email:
 *         hashedPassword:
 *         isAdmin:
 *         isActive:
 *         activateAccountExpire:
 *         activateAccountToken:
 *         createdAt:
 *         updatedAt:
 *         deletedAt:
 */

const express = require('express');
const { register, login, getMe } = require('../controllers/auth');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;
