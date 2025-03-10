const Joi = require("joi");

// Schema for creating a new OptionValue (POST)
const createOptionValueSchema = Joi.object({
  option_id: Joi.string().uuid().required().messages({
    "string.base": "option_id must be a valid UUID.",
    "string.guid": "option_id must be a valid UUID.",
    "any.required": "option_id is required.",
  }),
  option_values: Joi.string().required().messages({
    "string.base": "option_values must be a string.",
    "any.required": "option_values is required.",
  }),
  extra_price: Joi.number().min(0).default(0).messages({
    "number.base": "extra_price must be a number.",
    "number.min": "extra_price cannot be negative.",
  }),
});

// Schema for updating an existing OptionValue (PUT)
const updateOptionValueSchema = Joi.object({
  option_values: Joi.string().optional().messages({
    "string.base": "option_values must be a string.",
  }),
  extra_price: Joi.number().min(0).optional().messages({
    "number.base": "extra_price must be a number.",
    "number.min": "extra_price cannot be negative.",
  }),
});

module.exports = {
  createOptionValueSchema,
  updateOptionValueSchema,
};
