import Joi from 'joi';

const registerValidation = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().trim().min(1).required().messages({
      'string.empty': 'Username is required',
      'any.required': 'Username is required'
    }),
    email: Joi.string().trim().email().required().messages({
      'string.email': 'Please enter a valid email',
      'any.required': 'Email is required'
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': 'Password must be at least 6 characters long',
      'any.required': 'Password is required'
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(422).json({ errors: error.details.map(err => err.message) });
  }
  next();
};

export default registerValidation