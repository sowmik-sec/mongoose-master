import Joi from 'joi';

// UserName Schema
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .required()
    .regex(/^[A-Z][a-z]*$/)
    .messages({
      'string.base': 'First name must be a string',
      'string.empty': 'First name is required',
      'string.max': 'First name cannot be more than 20 characters',
      'any.required': 'First name is required',
      'string.pattern.base': 'First name must start with a capital letter',
    }),
  middleName: Joi.string().trim().allow(''),
  lastName: Joi.string()
    .trim()
    .required()
    .regex(/^[A-Za-z]+$/)
    .messages({
      'string.base': 'Last name must be a string',
      'string.empty': 'Last name is required',
      'any.required': 'Last name is required',
      'string.pattern.base':
        'Last name must contain only alphabetic characters',
    }),
});

// Guardian Schema
const guardianSchema = Joi.object({
  fatherName: Joi.string().trim().required().messages({
    'string.base': "Father's name must be a string",
    'string.empty': "Father's name is required",
    'any.required': "Father's name is required",
  }),
  fatherOccupation: Joi.string().trim().required().messages({
    'string.base': "Father's occupation must be a string",
    'string.empty': "Father's occupation is required",
    'any.required': "Father's occupation is required",
  }),
  fatherContactNo: Joi.string().trim().required().messages({
    'string.base': "Father's contact number must be a string",
    'string.empty': "Father's contact number is required",
    'any.required': "Father's contact number is required",
  }),
  motherName: Joi.string().trim().required().messages({
    'string.base': "Mother's name must be a string",
    'string.empty': "Mother's name is required",
    'any.required': "Mother's name is required",
  }),
  motherOccupation: Joi.string().trim().required().messages({
    'string.base': "Mother's occupation must be a string",
    'string.empty': "Mother's occupation is required",
    'any.required': "Mother's occupation is required",
  }),
  motherContactNo: Joi.string().trim().required().messages({
    'string.base': "Mother's contact number must be a string",
    'string.empty': "Mother's contact number is required",
    'any.required': "Mother's contact number is required",
  }),
});

// Local Guardian Schema
const localGuardianSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.base': "Local guardian's name must be a string",
    'string.empty': "Local guardian's name is required",
    'any.required': "Local guardian's name is required",
  }),
  occupation: Joi.string().trim().required().messages({
    'string.base': "Local guardian's occupation must be a string",
    'string.empty': "Local guardian's occupation is required",
    'any.required': "Local guardian's occupation is required",
  }),
  contactNo: Joi.string().trim().required().messages({
    'string.base': "Local guardian's contact number must be a string",
    'string.empty': "Local guardian's contact number is required",
    'any.required': "Local guardian's contact number is required",
  }),
  address: Joi.string().trim().required().messages({
    'string.base': "Local guardian's address must be a string",
    'string.empty': "Local guardian's address is required",
    'any.required': "Local guardian's address is required",
  }),
});

// Main Student Schema
const studentValidationSchema = Joi.object({
  id: Joi.string().trim().required().messages({
    'string.base': 'Student ID must be a string',
    'string.empty': 'Student ID is required',
    'any.required': 'Student ID is required',
  }),
  name: userNameValidationSchema.required().messages({
    'any.required': 'Student name is required',
  }),
  gender: Joi.string().trim().valid('male', 'female').required().messages({
    'any.only': '{#value} is not valid. Only "male" or "female" is allowed',
    'string.empty': 'Gender is required',
    'any.required': 'Gender is required',
  }),
  email: Joi.string().trim().email().required().messages({
    'string.base': 'Email must be a valid string',
    'string.empty': 'Email address is required',
    'string.email': '{#value} is not a valid email address',
    'any.required': 'Email address is required',
  }),
  dateOfBirth: Joi.string().trim().optional(),
  contactNo: Joi.string().trim().required().messages({
    'string.base': 'Contact number must be a string',
    'string.empty': 'Contact number is required',
    'any.required': 'Contact number is required',
  }),
  bloodGroup: Joi.string()
    .trim()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .messages({
      'any.only': '{#value} is not a valid blood group',
    }),
  presentAddress: Joi.string().trim().required().messages({
    'string.base': 'Present address must be a string',
    'string.empty': 'Present address is required',
    'any.required': 'Present address is required',
  }),
  permanentAddress: Joi.string().trim().required().messages({
    'string.base': 'Permanent address must be a string',
    'string.empty': 'Permanent address is required',
    'any.required': 'Permanent address is required',
  }),
  guardian: guardianSchema.required().messages({
    'any.required': 'Guardian information is required',
  }),
  localGuardian: localGuardianSchema.required().messages({
    'any.required': 'Local guardian information is required',
  }),
  emergencyContactNo: Joi.string().trim().required().messages({
    'string.base': 'Emergency contact number must be a string',
    'string.empty': 'Emergency contact number is required',
    'any.required': 'Emergency contact number is required',
  }),
  profileImg: Joi.string().trim().required().messages({
    'string.base': 'Profile image must be a string',
    'string.empty': 'Profile image is required',
    'any.required': 'Profile image is required',
  }),
  isActive: Joi.string()
    .trim()
    .valid('active', 'block')
    .default('active')
    .messages({
      'any.only': '{#value} is not valid. Only "active" or "block" is allowed',
    }),
});

export default studentValidationSchema;
