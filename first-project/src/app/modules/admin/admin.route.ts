import express from 'express';
import validateRequest from '../../utils/validateRequest';
import { AdminControllers } from './admin.controller';
import { AdminValidation } from './admin.validation';

const router = express.Router();

// it will call controller func
router.get('/', AdminControllers.getAllAdmins);
router.get('/:id', AdminControllers.getSingleAdmin);
router.patch(
  '/:id',
  validateRequest(AdminValidation.updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);
router.delete('/:id', AdminControllers.deleteSingleAdmin);

export const AdminRoutes = router;
