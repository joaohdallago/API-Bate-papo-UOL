import Joi from 'joi';

const participantSchema = Joi.object({
  name: Joi.string()
    .required(),

  lastStatus: Joi.number()
    .required(),
});

export default participantSchema;

// {
//     name: 'João',
//     lastStatus: 12313123
// }
