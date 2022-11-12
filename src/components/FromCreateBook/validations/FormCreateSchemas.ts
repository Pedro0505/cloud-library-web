import Joi from 'joi';

export default Joi.object({
  title: Joi.string().required().max(45)
    .messages({
      'any.required': 'Título é obrigatório',
      'string.empty': 'Título não pode ser vazio',
      'string.max': 'Título não pode ser maior que 45 caracteres',
    }),
  caption: Joi.string().required().max(45)
    .messages({
      'any.required': 'Subtítulo é um campo obrigatório',
      'string.empty': 'Subtítulo não pode ser vazio',
      'string.max': 'Subtítulo não pode ser maior que 45 caracteres',
    }),
  writerId: Joi.string().required().messages({
    'any.required': 'Autor é um campo obrigatório',
    'string.empty': 'Autor não pode ser vazio',
  }),
});
