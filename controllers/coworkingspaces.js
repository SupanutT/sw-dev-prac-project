const models = require("../sequelize/models");
const CoworkingSpace = models.CoworkingSpace;
const { Op } = require("sequelize");

//@desc     Get all coworkingspaces
//@route    GET /api/v1/coworkingspaces
//@access   Public
exports.getCoworkingSpaces = async (req, res, next) => {
  try {
    console.log(req.user);
    let whereClause = {};
    const allowedOperations = {
      gt: Op.gt,
      gte: Op.gte,
      lt: Op.lt,
      lte: Op.lte,
      in: Op.in,
      eq: Op.eq,
    };
    const allowedFilters = ["name", "openTime"]; // Define allowed filter fields
    Object.keys(req.query).forEach((key) => {
      // console.log(key);
      if (allowedFilters.includes(key)) {
        const op = Object.keys(req.query[key])[0];
        const operator = allowedOperations[op];
        whereClause[key] = {
          [operator]: req.query[key][op],
        };
      }
    });

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const offset = (page - 1) * limit;

    const sort = req.query.sort ? req.query.sort.split(",") : ["createdAt"];

    const attributes = req.query.select ? req.query.select.split(",") : null;
    const { count, rows } = await CoworkingSpace.findAndCountAll({
      where: whereClause,
      offset,
      limit,
      order: sort,
      attributes,
    });
    const coworkingspaces = rows.map((row) => row.dataValues);

    return res.status(200).json({
      success: true,
      count: coworkingspaces.length,
      data: coworkingspaces,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@desc     Get single coworkingspace
//@route    GET /api/v1/coworkingspaces/:id
//@access   Public
exports.getCoworkingSpace = async (req, res, next) => {
  try {
    const coworkingspace = await CoworkingSpace.findByPk(req.params.id);

    if (!coworkingspace) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: coworkingspace.dataValues });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@desc     Create a coworkingspace
//@route    POST /api/v1/coworkingspaces
//@access   Private
exports.createCoworkingSpace = async (req, res, next) => {
  try {
    const coworkingspace = await CoworkingSpace.create(req.body);
    res.status(201).json({ success: true, data: coworkingspace.dataValues });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@desc     Update single coworkingspace
//@route    PUT /api/v1/coworkingspaces/:id
//@access   Private
exports.updateCoworkingSpace = async (req, res, next) => {
  try {
    const coworkingspace = await CoworkingSpace.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!coworkingspace) {
      return res.status(400).json({ success: false });
    }

    const modifiedCoworkingSpace = await CoworkingSpace.findByPk(req.params.id);

    res
      .status(200)
      .json({ success: true, data: modifiedCoworkingSpace.dataValues });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@desc     Delete single coworkingspace
//@route    DELETE /api/v1/coworkingspaces/:id
//@access   Private
exports.deleteCoworkingSpace = async (req, res, next) => {
  try {
    const coworkingspace = await CoworkingSpace.findByPk(req.params.id);

    if (!coworkingspace) {
      return res.status(400).json({ success: false });
    }

    await coworkingspace.destroy();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
