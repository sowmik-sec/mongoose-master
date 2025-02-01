import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../utils/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';

const router = express.Router();

// it will call controller func
router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);
router.get('/:id', AcademicSemesterControllers.getSingleAcademicSemester);
router.put(
  '/:id',
  validateRequest(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.updateAcademicSemester,
);
router.get('/', AcademicSemesterControllers.getAllAcademicSemester);
export const AcademicSemesterRoutes = router;
