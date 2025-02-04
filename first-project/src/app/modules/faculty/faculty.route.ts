import express from 'express';
import validateRequest from '../../utils/validateRequest';
import { FacultyControllers } from './faculty.controller';
import { FacultyValidation } from './faculty.validation';

const router = express.Router();

// it will call controller func
router.get('/', FacultyControllers.getAllFaculties);
router.get('/:FacultyId', FacultyControllers.getSingleFaculty);
router.patch(
  '/:FacultyId',
  validateRequest(FacultyValidation.updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);
router.delete('/:FacultyId', FacultyControllers.deleteSingleFaculty);

export const FacultyRoutes = router;
