import dotenv from 'dotenv';
import { employees } from './data/employees.js';
import Employee from './models/employee.model.js';
import { connectDB } from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Employee.deleteMany();

    const createdEmployee = await Employee.insertMany(employees);

    await Employee.insertMany(createdEmployee);

    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroytData();
} else {
  importData();
}
