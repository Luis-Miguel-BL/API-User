import { Joi } from 'celebrate';

const _Joi = {
  limit: Joi.number().integer().positive(),
  offset: Joi.number().integer().positive(),
  uuid: Joi.string().uuid({ version: 'uuidv4' }),
  cpf: Joi.string().length(11),
  email: Joi.string().email(),
};

export default _Joi;
