const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getByInstructor = {
    params: Joi.object().keys({
        id: Joi.string().required().custom(objectId),
    }),
    query: Joi.object().keys({
        select: Joi.string(),
        populate: Joi.string(),
    }),
};

const createLecture = {
    body: Joi.object().keys({
        course: Joi.string().required().custom(objectId),
        instructor: Joi.string().required().custom(objectId),
        date: Joi.string().required(),
    }),
};

const updateLecture = {
    params: Joi.object().keys({
        id: Joi.string().required().custom(objectId),
    }),
    body: Joi.object().keys({
        instructor: Joi.string().required().custom(objectId),
        date: Joi.string().required(),
    }),
};

const deleteLecture = {
    params: Joi.object().keys({
        id: Joi.string().required().custom(objectId),
    }),
};

const getAllLecture = {
    query: Joi.object().keys({
        select: Joi.string(),
        populate: Joi.string(),
        page: Joi.number(),
        limit: Joi.number(),
    }),
};


module.exports = {
    getByInstructor,
    createLecture,
    deleteLecture,
    updateLecture,
    getAllLecture
}