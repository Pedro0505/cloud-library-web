import Joi from 'joi';

export default Joi.object({
  name: Joi.string().required().max(45)
    .messages({
      'any.required': 'Nome é um campo obrigatório',
      'string.empty': 'Nome não pode ser vazio',
      'string.max': 'Nome não pode ter mais que 45 caracteres',
    }),
});
