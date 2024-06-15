import express from 'express';
import {
  createEmployee,
  deleteEmployee,
  getEmployeeById,
  getEmployeeList,
  updateEmployee,
} from '../controllers/employee.controller.js';

const router = express.Router();

router.route('/').get(getEmployeeList).post(createEmployee).put(updateEmployee);
router.route('/:id').get(getEmployeeById).delete(deleteEmployee);

export default router;
