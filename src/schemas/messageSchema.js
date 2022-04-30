import Joi from 'joi';

const messageSchema = Joi.object({
  from: Joi.string()
    .required(),

  to: Joi.string()
    .required(),

  text: Joi.string()
    .required(),

  type: Joi.string()
    .required(),

  time: Joi.string()
    .required(),
});

export default messageSchema;

// {
//   from: 'João',
//   to: 'Todos',
//   text: 'oi galera',
//   type: 'message',
//   time: '20:04:37',
// }
