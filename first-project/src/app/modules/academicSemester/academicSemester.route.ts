import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';

const router = express.Router();

// it will call controller func
router.post(
  '/create-academic-semester',
  AcademicSemesterControllers.createAcademicSemester,
);
export const AcademicSemesterRoutes = router;
