import Joi from 'joi';

 const guardian_validation_schema = Joi.object({
  fatherName: Joi.string().required().messages({
    'any.required': 'Father name is required',
    'string.base': 'Father name must be a string',
  }),
  fatherOccupation: Joi.string().required().messages({
    'any.required': 'Father occupation is required',
  }),
  fatherContactNo: Joi.string().required().messages({
    'any.required': 'Father contact number is required',
  }),
  motherName: Joi.string().required().messages({
    'any.required': 'Mother name is required',
  }),
  motherOccupation: Joi.string().required().messages({
    'any.required': 'Mother occupation is required',
  }),
  motherContactNo: Joi.string().required().messages({
    'any.required': 'Mother contact number is required',
  }),
});

 const userName_validation_schema = Joi.object({
  firstName: Joi.string().required().messages({
    'any.required': 'First name is required',
  }),
  middleName: Joi.string().allow('', null),
  lastName: Joi.string().required().messages({
    'any.required': 'Last name is required',
  }),
});

 const localGuardian_validation_schema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Local guardian name is required',
  }),
  occupation: Joi.string().required().messages({
    'any.required': 'Local guardian occupation is required',
  }),
  contactNo: Joi.string().required().messages({
    'any.required': 'Local guardian contact number is required',
  }),
  address: Joi.string().required().messages({
    'any.required': 'Local guardian address is required',
  }),
});

 const student_validation_schema = Joi.object({
  id: Joi.string().required().messages({
    'any.required': 'Student ID is required',
  }),
  name: userName_validation_schema.required(),
  gender: Joi.string().valid('male', 'female').required().messages({
    'any.only': "Gender must be either 'male' or 'female'",
  }),
  dateOfBirth: Joi.date().iso().required().messages({
    'date.base': 'Date of birth must be a valid ISO date',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.email': 'Email must be valid',
  }),
  contactNo: Joi.string().required().messages({
    'any.required': 'Contact number is required',
  }),
  emergencyContactNo: Joi.string().required().messages({
    'any.required': 'Emergency contact number is required',
  }),
  bloodGroup: Joi.string().valid(
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
  ),
  presentAddress: Joi.string().required().messages({
    'any.required': 'Present address is required',
  }),
  permanentAddress: Joi.string().required().messages({
    'any.required': 'Permanent address is required',
  }),
  guardian: guardian_validation_schema.required(),
  localGuardian: localGuardian_validation_schema.required(),
  profileImage: Joi.string().uri().optional(),
  isActive: Joi.string()
  .valid('active', 'block')
  .default('active')
  .messages({
    'any.only': "Status must be either 'active' or 'block'",
  }),
});


export default student_validation_schema