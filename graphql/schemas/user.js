import Joi from 'joi';

export default Joi.object().keys({
  email: Joi.string()
    .email()
    .required()
    .label('Email'),
  firstName: Joi.string()
    .alphanum()
    .max(30)
    .required()
    .label('firstName')
});
