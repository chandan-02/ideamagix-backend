const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createBatch = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
    }),
};

const updateBatch = {
    params: Joi.object().keys({
        id: Joi.string().required().custom(objectId),
    }),
    body: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
    }),
};

const deleteBatch = {
    params: Joi.object().keys({
        id: Joi.string().required().custom(objectId),
    }),
};

const getAllBatch = {
    query: Joi.object().keys({
        select: Joi.string(),
        page: Joi.number(),
        limit: Joi.number(),
    }),
};


module.exports = {
    createBatch,
    updateBatch,
    deleteBatch,
    getAllBatch,
}