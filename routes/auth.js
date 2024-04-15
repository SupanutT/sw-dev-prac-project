/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-increment integer id of the user
 *         firstName:
 *           type: string
 *           description: User first name
 *         lastName:
 *           type: string
 *           description: User last name
 *         phoneNumber:
 *           type: string
 *           description: User phone number
 *         email:
 *           type: string
 *           description: User email
 *         password:
 *           type: string
 *           description: User hashed password
 *         role:
 *           type: string
 *           enum: [admin, user]
 *           description: User role
 *         isActive:
 *           type: boolean
 *           description: The status of the user
 *         activateAccountExpire:
 *           type: date
 *           description: The time the acctivation token is expired
 *         activateAccountToken:
 *           type: string
 *           description: The acctivation token
 *         createdAt:
 *           type: string
 *           description: The time this user is created
 *         updatedAt:
 *           type: string
 *           description: The latest time this user is updated
 *         deletedAt:
 *           type: string
 *           nullable: true
 *           description: The time this user is deleted
 *       example:
 *         id: 1
 *         firstName: Keshaun
 *         lastName: Dietrich
 *         phoneNumber: "022222222"
 *         email: Jessie99@test.com
 *         password: $2a$10$SrCkmuaRYKZYE.P39/rFQe76MEgpf39zIY9WaYNsEKNZXh1hd2dvC
 *         role: user
 *         isActive: true
 *         activateAccountExpire: 2024-04-05 11:24:48
 *         activateAccountToken: wxly4li7bmnkfftg
 *         createdAt: 2024-04-04T15:55:58.784Z
 *         updatedAt: 2024-04-04T15:55:58.784Z
 *         deletedAt: null
 *   requestBodies:
 *     UserBody:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: User first name
 *         lastName:
 *           type: string
 *           description: User last name
 *         phoneNumber:
 *           type: string
 *           description: User phone number
 *         email:
 *           type: string
 *           description: User email
 *         password:
 *           type: string
 *           description: User password (not hashed version)
 *         role:
 *           type: string
 *           description: User role
 *       example:
 *         firstName: Keshaun
 *         lastName: Dietrich
 *         phoneNumber: "022222222"
 *         email: "Jessie99@test.com"
 *         password: root1234
 *         role: user
 */
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 */
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/UserBody'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: User id
 *                 firstName:
 *                   type: string
 *                   description: User first name
 *                 lastName:
 *                   type: string
 *                   description: User last name
 *                 email:
 *                   type: string
 *                   description: User email
 *       400:
 *         description: Some error happened
 */
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in the user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User email
 *               password:
 *                 type: string
 *                 description: User password (not hashed)
 *     responses:
 *       200:
 *         description: User is logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: User id
 *                 firstName:
 *                   type: string
 *                   description: User first name
 *                 lastName:
 *                   type: string
 *                   description: User last name
 *                 email:
 *                   type: string
 *                   description: User email
 *       400:
 *         description: Some error happened
 */
/**
 * @swagger
 * /me:
 *   get:
 *     summary: Get the user by auth Bearer token
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The user description by auth Bearer token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Some error happened
 */
/**
 * @swagger
 * /activate/{id}:
 *   get:
 *     summary: Get the user activated by token id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           default: 1
 *         required: true
 *         description: The acctivation token
 *     responses:
 *       200:
 *         description: The user is activated by token id
 *       400:
 *         description: Some error happened
 */

const express = require('express');
const { register, login, getMe, activate } = require('../controllers/auth');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/activate/:id', activate);

module.exports = router;
