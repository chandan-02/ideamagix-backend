const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCourse = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        level: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().required(),
        batches: Joi.array(),
    }),
};

const updateCourse = {
    params: Joi.object().keys({
        id: Joi.string().required().custom(objectId),
    }),
    body: Joi.object().keys({
        name: Joi.string().required(),
        level: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().required(),
        batches: Joi.array(),
    }),
};

const deleteCourse = {
    params: Joi.object().keys({
        id: Joi.string().required().custom(objectId),
    }),
};

const getAllCourse = {
    query: Joi.object().keys({
        select: Joi.string(),
        page: Joi.number(),
        limit: Joi.number(),
    }),
};


module.exports = {
    createCourse,
    updateCourse,
    deleteCourse,
    getAllCourse,
}