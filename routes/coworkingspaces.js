/**
 * @swagger
 * components:
 *   schemas:
 *     CoworkingSpace:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-increment integer id of the coworking space
 *         name:
 *           type: string
 *           description: Coworking space name
 *         address:
 *           type: string
 *           description: Coworking space address
 *         phoneNumber:
 *           type: string
 *           description: Coworking space phone number
 *         openTime:
 *           type: string
 *           description: Coworking space open time
 *         closeTime:
 *           type: string
 *           description: Coworking space close time
 *         createdAt:
 *           type: string
 *           description: The time this record is created
 *         updatedAt:
 *           type: string
 *           description: The latest time this record is updated
 *         deletedAt:
 *           type: string
 *           nullable: true
 *           description: The time this record is deleted
 *       example:
 *         id: 1
 *         name: Chula Library
 *         address: 254 ถนนพญาไท แขวงวังใหม่ เขตปทุมวัน กรุงเทพมหานคร 10330
 *         phoneNumber: "022182929"
 *         openTime: 08:00
 *         closeTime: 21:00
 *         createdAt: 2024-04-04T15:55:58.784Z
 *         updatedAt: 2024-04-04T15:55:58.784Z
 *         deletedAt: null
 *   requestBodies:
 *     CoworkingSpaceBody:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Coworking space name
 *         address:
 *           type: string
 *           description: Coworking space address
 *         phoneNumber:
 *           type: string
 *           description: Coworking space phone number
 *         openTime:
 *           type: string
 *           description: Coworking space open time
 *         closeTime:
 *           type: string
 *           description: Coworking space close time
 *       example:
 *         name: Home Library
 *         address: 123/2 Bangkok
 *         phoneNumber: "0123456789"
 *         openTime: 09:00
 *         closeTime: 21:00
 */
/**
 * @swagger
 * tags:
 *   name: CoworkingSpaces
 *   description: The coworking spaces managing API
 */
/**
 * @swagger
 * /coworkingspaces:
 *   get:
 *     summary: Returns the list of all the coworking spaces
 *     tags: [CoworkingSpaces]
 *     parameters:
 *       - in: query
 *         name: name[like]
 *         schema:
 *           type: string
 *           default: %Library%
 *       - in: query
 *         name: openTime[gte]
 *         schema:
 *           type: string
 *           default: 06:00
 *       - in: query
 *         name: closeTime[lte]
 *         schema:
 *           type: string
 *           default: 22:00
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 25
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: createdAt
 *       - in: query
 *         name: select
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The list of the coworking spaces
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CoworkingSpace'
 *       400:
 *         description: Some error happened
 *   post:
 *     summary: Create a new coworking space
 *     tags: [CoworkingSpaces]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/CoworkingSpaceBody'
 *     responses:
 *       201:
 *         description: The coworking space was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CoworkingSpace'
 *       400:
 *         description: Some error happened
 */
/**
 * @swagger
 * /coworkingspaces/{id}:
 *   get:
 *     summary: Get the coworking space by id
 *     tags: [CoworkingSpaces]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           default: 1
 *         required: true
 *         description: The coworking space id
 *     responses:
 *       200:
 *         description: The coworking space description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/CoworkingSpace'
 *       404:
 *         description: The coworking space was not found
 *       400:
 *         description: Some error happened
 *   put:
 *     summary: Update the coworking space by id
 *     tags: [CoworkingSpaces]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           default: 1
 *         required: true
 *         description: The coworking space id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/CoworkingSpaceBody'
 *     responses:
 *       200:
 *         description: The coworking space was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CoworkingSpace'
 *       404:
 *         description: The coworking space was not found
 *       400:
 *         description: Some error happened
 *   delete:
 *     summary: Remove the coworking space by id
 *     tags: [CoworkingSpaces]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           default: 1
 *         required: true
 *         description: The coworking space id
 *     responses:
 *       200:
 *         description: The coworking space was deleted
 *       404:
 *         description: The coworking space was not found
 *       400:
 *         description: Some error happened
 */
/**
 * @swagger
 * /coworkingspaces/{coworkingSpaceId}/reservations:
 *   get:
 *     summary: Returns the list of all the reservation of the selected coworking space
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: coworkingSpaceId
 *         schema:
 *           type: string
 *           default: 1
 *         required: true
 *         description: The coworking space id
 *     responses:
 *       200:
 *         description: The list of the reservations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 *       500:
 *         description: Some error happened
 *   post:
 *     summary: Create a new reservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: coworkingSpaceId
 *         schema:
 *           type: string
 *           default: 1
 *         required: true
 *         description: The coworking space id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/requestBodies/ReservationBody'
 *     responses:
 *       201:
 *         description: The reservation was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       500:
 *         description: Some error happened
 */

const express = require('express');
const {
    getCoworkingSpaces,
    getCoworkingSpace,
    createCoworkingSpace,
    updateCoworkingSpace,
    deleteCoworkingSpace
} = require('../controllers/coworkingspaces');
const { protect, authorize } = require('../middleware/auth');
const reservationRouter = require('./reservations');

const router = express.Router();

router.use('/:coworkingSpaceId/reservations/', reservationRouter);

router.route('/').get(getCoworkingSpaces).post(protect, authorize('admin'), createCoworkingSpace);
router
    .route('/:id')
    .get(getCoworkingSpace)
    .put(protect, authorize('admin'), updateCoworkingSpace)
    .delete(protect, authorize('admin'), deleteCoworkingSpace);

module.exports = router;
