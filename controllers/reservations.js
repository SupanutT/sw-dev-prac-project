const models = require("../sequelize/models");
const Reservation = models.Reservation;
const CoworkingSpace = models.CoworkingSpace;

//@desc     Get all reservations
//@route    GET /api/v1/reservations
//@access   Private
exports.getReservations = async (req, res, next) => {
  try {
    // Generatl users can see only their reservations!
    let reservations;
    if (req.user.role === "user") {
      reservations = await Reservation.findAll({
        where: {
          userId: req.user.id,
        },
        include: CoworkingSpace,
      });
    } else {
      // If you are an admin, you can see all!
      if (req.params.coworkingSpaceId) {
        reservations = await Reservation.findAll({
          where: {
            coworkingSpaceId: req.params.coworkingSpaceId,
          },
          include: CoworkingSpace,
        });
      } else {
        reservations = await Reservation.findAll({
          include: CoworkingSpace.name,
        });
      }
    }

    res
      .status(200)
      .json({ success: true, count: reservations.length, data: reservations });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Cannot find Reservation",
    });
  }
};

//@desc     Get a single reservation
//@route    GET /api/v1/reservations/:id
//@access   Public
exports.getReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findOne({
      where: {
        id: req.params.id,
      },
      include: CoworkingSpace,
    });

    if (!reservation) {
      return res
        .status(404)
        .json({
          success: false,
          message: `No reservation with the id of ${req.params.id}`,
        });
    }

    res.status(200).json({ success: true, data: reservation.dataValues });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Cannot find reservation" });
  }
};

//@desc     Add a single reservation
//@route    POST /api/v1/coworkingspaces/:coworkingSpaceId/reservations/
//@access   Private
exports.addReservation = async (req, res, next) => {
  try {
    req.body.coworkingSpaceId = req.params.coworkingSpaceId;
    const coworkingspace = await CoworkingSpace.findByPk(
      req.params.coworkingSpaceId
    );
    if (!coworkingspace) {
      return res
        .status(404)
        .json({
          success: false,
          message: `No coworking space with the id of ${req.params.coworkingSpaceId}`,
        });
    }
    // Add userId to req.body
    req.body.userId = req.user.id;
    console.log(req.user.id);
    // Check for existed reservations
    const existedReservations = await Reservation.findAll({
      where: {
        userId: req.user.id,
      },
    });
    // If the user is not an admin, they can only create 3 reservations
    console.log(existedReservations);
    if (existedReservations.length >= 3 && req.user.role !== "admin") {
      return res
        .status(400)
        .json({
          success: false,
          message: `The user with ID ${req.user.id} has already made 3 reservations`,
        });
    }
    const reservation = await Reservation.create(req.body);
    res.status(201).json({ success: true, data: reservation });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Cannot create a reservation" });
  }
};

//@desc     Update a single reservation
//@route    PUT /api/v1/reservations/:id
//@access   Private
exports.updateReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id);
    if (!reservation) {
      return res
        .status(404)
        .json({
          success: false,
          message: `No reservation with id ${req.params.id}`,
        });
    }

    // Make sure user is the reservation owner
    if (
      reservation.dataValues.userId !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res
        .status(401)
        .json({
          success: false,
          message: `user ${req.user.id} is not authorized to update this reservation`,
        });
    }

    await reservation.update(req.body);
    const modifiedReservation = await Reservation.findByPk(req.params.id);
    res
      .status(200)
      .json({ success: true, data: modifiedReservation.dataValues });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Cannot update a reservation" });
  }
};

//@desc     Delete a single reservation
//@route    DELETE /api/v1/reservations/:id
//@access   Private
exports.deleteReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id);
    if (!reservation) {
      return res
        .status(404)
        .json({
          success: false,
          message: `No reservation with id ${req.params.id}`,
        });
    }

    // Make sure user is the reservation owner
    if (
      reservation.dataValues.userId !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res
        .status(401)
        .json({
          success: false,
          message: `User ${req.user.id} is not authorized to delete this reservation`,
        });
    }

    await reservation.destroy();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Cannot delete a reservation" });
  }
};
