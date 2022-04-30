import Joi from 'joi';

const messageSchema = Joi.object({
  to: Joi.string()
    .required(),

  text: Joi.string()
    .required(),

  type: Joi.string()
    .valid('message', 'private_message')
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
