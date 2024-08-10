const Joi = require("joi");

const validateCreateProductSchema = (data) => {
  const createProductSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required().positive(),
    stock: Joi.number().required().min(0),
    variations: Joi.object({
      size: Joi.string().required(), // Required size field
      color: Joi.string().required(), // Required color field
      material: Joi.string().required(), // Required material field
    }).required(),
    isHidden: Joi.boolean(),
  });
  return createProductSchema.validate(data);
};

const validateUpdateProductSchema = (data) => {
  const updateProductSchema = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    price: Joi.number().positive(),
    stock: Joi.number().min(0),
    isHidden: Joi.boolean(),
    variations: Joi.array().items(
      Joi.object({
        size: Joi.string(),
        color: Joi.string(),
        material: Joi.string,
      })
    ),
  });
  return updateProductSchema.validate(data);
};

module.exports = {
  validateCreateProductSchema,
  validateUpdateProductSchema,
};
// Products Collection:
// `name`: String
// `description`: String
// `price`: Number
// `stock`: Number
// `variations`: [Object] (size, color, material)
// `isHidden`: Boolean
