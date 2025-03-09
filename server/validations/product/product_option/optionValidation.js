const Joi = require("joi");

// Validation schema for creating Option (POST)
const createOptionSchema = Joi.object({
  name: Joi.string().min(1).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "string.min": "Name must be at least 1 characters long",
    "any.required": "Name is required",
  }),
  category_id: Joi.string().uuid().guid({ version: "uuidv4" }).optional().messages({
    "string.uuid": "Category ID must be a valid UUID",
    "string.guid": "category_id must be uuid",
  }),
  type: Joi.string()
    .valid("select", "text", "number", "checkbox")
    .required()
    .messages({
      "string.base": "Type must be a string",
      "any.only":
        "Type must be one of the following: select, text, number, checkbox",
      "any.required": "Type is required",
    }),
});

// Validation schema for updating Option (PUT)
const updateOptionSchema = Joi.object({
  name: Joi.string().min(3).optional().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name cannot be empty",
    "string.min": "Name must be at least 3 characters long",
  }),
  category_id: Joi.string().uuid().guid({ version: "uuidv4" }).optional().messages({
    "string.uuid": "Category ID must be a valid UUID",
    "string.guid": "category_id must be uuid",
  }),
  type: Joi.string()
    .valid("select", "text", "number", "checkbox")
    .optional()
    .messages({
      "string.base": "Type must be a string",
      "any.only":
        "Type must be one of the following: select, text, number, checkbox",
    }),
});

module.exports = { createOptionSchema, updateOptionSchema };
