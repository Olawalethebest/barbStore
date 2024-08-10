const Joi = require("joi");

const validateCreateUserSchema = (data) => {
  const createUserSchema = Joi.object({
    surname: Joi.string().required(),
    othernames: Joi.string().required(),
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    phone: Joi.string(),
    password: Joi.string().required(),
  });
  return createUserSchema.validate(data);
};

const validateChangePermissionSchema = (data) => {
  const validateChangePermission = Joi.object({
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    role: Joi.string().required().valid("admin", "customer"),
  });
  return validateChangePermission.validate(data);
};

module.exports = {
  validateCreateUserSchema,
  validateChangePermissionSchema,
};
