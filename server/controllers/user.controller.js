const db = require('../models/index');

const userInfo = db.users;

// import user from './services/user.service';

exports.list = async function(req, res) {
  let userList;
  const where = { deletedAt: { [db.Sequelize.Op.eq]: null } };
  let sorting;
  if (req.query.sort && req.query.sort !== ''){
    sorting = req.query.sort.split(',').map(col => col.split(':'));
  } else {
    sorting = ['id'];
  }

  if (req.query.search !== undefined && req.query.search !== '') {
    where.name = { [db.Sequelize.Op.iLike]: `%${req.query.search}%` };
  }else if(req.params.id){
    where.id = req.params.id
  }

  try {
    userList = await userInfo.findAll({
      limit: req.query.count || 10,
      offset: req.query.skip,
      order: sorting,
      where,
    });
  } catch (err){
    return res.status(500).json({
      status: false,
      message: 'Internal Server Error : No record found.!',
      details: err,
    });
  }
  if (userList.length > 0) {
    return res.status(200).json({
      status: true,
      message: 'All users details are fetched successfully.',
      data: userList,
    });
  }
  return res.status(200).json({
    status: true,
    message: 'No users found.',
    data: userList,
  });
};

exports.create = async function(req, res) {
  let userDetails;
  try {
    userDetails = await userInfo.create(req.body);
  } catch (err){
    return res.status(500).json({
      status: false,
      message: 'Internal server error',
      details: err,
    });
  }
  return res.status(201).json({
    status: true,
    message: 'User details stored successfully.',
    data: userDetails,
  });
};

exports.edit = async function(req, res) {
  const userId = req.params.id;
  let userDetails;
  try {
    userDetails = await userInfo.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        isActive: req.body.isActive,
        gender: req.body.gender,
      },
      {
        where: {
          id: userId,
          deletedAt: { [db.Sequelize.Op.eq]: null },
        },
        returning: true,
        plain: true,
      }
    );
  } catch (err){
    return res.status(500).json({
      status: false,
      message: `Internal server error - user id [ ${userId} ] not found / already deleted.`,
      details: err,
    });
  }
  return res.status(200).json({
    status: true,
    message: 'User details updated successfully.',
    data: userDetails[1].dataValues,
  });
};


exports.delete = async function(req, res) {
  const userId = req.params.id;
  let result;
  try {
    result = await userInfo.update(
      {
        deletedAt: Date.now(),
      },
      {
        where: {
          id: userId,
          deletedAt: { [db.Sequelize.Op.eq]: null },
        },
      }
    );
  } catch (err){
    return res.status(500).json({
      status: false,
      message: 'Internal server error',
      details: err,
    });
  }
  if (result > 0) {
    return res.status(200).json({
      status: true,
      message: `User id: [ ${userId} ] deleted successfully.`,
      data: result,
    });
  }
  return res.status(200).json({
    status: true,
    message: `User id:[ ${userId} ] not found / already deleted.`,
    data: result,
  });
};


exports.deActive = async function(req, res) {
  const userId = req.params.id;
  let userDetails;
  try {
    userDetails = await userInfo.update(
      {
        isActive: false,
      },
      {
        where: {
          id: userId,
          deletedAt: { [db.Sequelize.Op.eq]: null },
        },
        returning: true,
        plain: true,
      }
    );
  } catch (err){
    return res.status(500).json({
      status: false,
      message: `Internal server error - user id [ ${userId} ] not found / already deleted.`,
      details: err,
    });
  }

  return res.status(200).json({
    status: true,
    message: `deActive Successfully -> User Id : ${userId}`,
    data: userDetails[1].dataValues,
  });
};

exports.active = async function(req, res) {
  const userId = req.params.id;
  let userDetails;
  try {
    userDetails = await userInfo.update(
      {
        isActive: true,
      },
      {
        where: {
          id: userId,
          deletedAt: { [db.Sequelize.Op.eq]: null },
        },
        returning: true,
        plain: true,
      }
    );
  } catch (err){
    return res.status(500).json({
      status: false,
      message: `Internal server error - user id [ ${userId} ] not found / already deleted.`,
      details: err,
    });
  }

  return res.status(200).json({
    status: true,
    message: `Active Successfully -> User Id : ${userId}`,
    data: userDetails[1].dataValues,
  });
};
