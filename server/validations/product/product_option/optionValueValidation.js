const Joi = require("joi");

const createOptionValueSchema = Joi.object({
  option_id: Joi.string().uuid().required(),
  value: Joi.string().required(),
  extra_price: Joi.number().min(0).default(0),
  is_default: Joi.boolean().default(false),
  sort_order: Joi.number().integer().allow(null),
});
const updateOptionValueSchema = Joi.object({
  option_id: Joi.string().uuid().optional(),
  value: Joi.string().optional(),
  extra_price: Joi.number().min(0).optional(),
  is_default: Joi.boolean().optional(),
  sort_order: Joi.number().integer().allow(null).optional(),
});

module.exports = {
  createOptionValueSchema,
  updateOptionValueSchema,
};
