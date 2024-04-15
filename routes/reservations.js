/**
 * @swagger
 * components:
 *   schemas:
 *     Reservation:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-increment integer id of the reservation
 *         userId:
 *           type: integer
 *           description: User id of this reservation
 *         coworkingSpaceId:
 *           type: integer
 *           description: Coworking space id of the reservation
 *         reservationDate:
 *           type: string
 *           description: Reservation date
 *         createdAt:
 *           type: string
 *           description: The time this reservation is created
 *         updatedAt:
 *           type: string
 *           description: The latest time this reservation is updated
 *         deletedAt:
 *           type: string
 *           nullable: true
 *           description: The time this reservation is deleted
 *       example:
 *         id: 1
 *         userId: 1
 *         coworkingSpaceId: 1
 *         reservationDate: 2024-04-10T10:00:00.000Z
 *         createdAt: 2024-04-04T14:31:35.000Z
 *         updatedAt: 2024-04-04T14:31:35.000Z
 *         deletedAt: null
 *     ReservationCore:
 *       type: object
 *       properties:
 *         userId:
 *           type: integer
 *           description: User id of this reservation
 *         coworkingSpaceId:
 *           type: integer
 *           description: Coworking space id of this reservation
 *         reservationDate:
 *           type: string
 *           description: Reservation date
 *       example:
 *         userId: 1
 *         coworkingSpaceId: 1
 *         reservationDate: 2025-01-02T14:00:00.000Z
 */
/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: The reservation managing API
 */
/**
 * @swagger
 * /reservations:
 *   get:
 *     summary: Returns the list of all the reservations
 *     tags: [Reservations]
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
 *          description: Some error happened
 */
/**
 * @swagger
 * /reservations/{id}:
 *   get:
 *     summary: Get the reservation by id
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           default: 1
 *         required: true
 *         description: The reservation id
 *     responses:
 *       200:
 *         description: The reservation description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       404:
 *         description: The reservation was not found
 *       500:
 *         description: Some error happened
 *   put:
 *     summary: Update the reservation by id
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           default: 1
 *         required: true
 *         description: The reservation id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReservationCore'
 *     responses:
 *       200:
 *         description: The reservation was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       404:
 *         description: The reservation was not found
 *       400:
 *         description: Some error happened
 *   delete:
 *     summary: Remove the reservation by id
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           default: 1
 *         required: true
 *         description: The reservation id
 *     responses:
 *       200:
 *         description: The reservation was deleted
 *       404:
 *         description: The reservation was not found
 *       400:
 *         description: Some error happened
 *
 */
const express = require('express');
const { getReservations, getReservation, addReservation, updateReservation, deleteReservation } = require('../controllers/reservations');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.route('/').get(protect, getReservations).post(protect, authorize('admin', 'user'), addReservation);
router
    .route('/:id')
    .get(protect, getReservation)
    .put(protect, authorize('admin', 'user'), updateReservation)
    .delete(protect, authorize('admin', 'user'), deleteReservation);

module.exports = router;
