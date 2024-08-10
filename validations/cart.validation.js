const Joi = require("joi");

const validateAddToCartSchema = (data) => {
  const addToCartSchema = Joi.object({
    product_id: Joi.string().required(),
    quantity: Joi.number().integer().required().positive(),
  });
  return addToCartSchema.validate(data);
};

module.exports = {
  validateAddToCartSchema,
};
