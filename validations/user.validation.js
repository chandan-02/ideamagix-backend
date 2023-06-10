const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    username: Joi.string().required(),
    role: Joi.string().required().valid('instructor', 'admin'),
    password: Joi.string().required().custom(password),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId)
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    username: Joi.string().required(),
    role: Joi.string().required().valid('instructor', 'admin'),
    password: Joi.string().required().custom(password),
  }),
};

const loginUser = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().custom(password).required(),
  }),
};

const getUserQuery = {
  query: Joi.object().keys({
    select: Joi.string(),
    page: Joi.number(),
    limit: Joi.number(),
  }),
};


module.exports = {
  createUser,
  getUserQuery,
  updateUser,
  loginUser,
}
