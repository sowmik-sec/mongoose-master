import express from 'express';
import validateRequest from '../../utils/validateRequest';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';
import { SemesterRegistrationController } from './semesterRegistration.controller';
const router = express.Router();

// it will call controller func
router.post(
  '/create-course',
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.createSemesterRegistration,
);

router.get(
  '/:id',
  SemesterRegistrationController.getSingleSemesterRegistration,
);
router.patch(
  '/:id',
  SemesterRegistrationController.updateSingleSemesterRegistration,
);
router.delete(
  '/:id',
  SemesterRegistrationController.deleteSemesterRegistration,
);
router.get('/', SemesterRegistrationController.getAllSemesterRegistration);

export const SemesterRegistrationRoutes = router;
