import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';
import Employee from '../models/employee.model.js';

//@desc get employee list
//@route GET api/employee
//@access public

const getEmployeeList = asyncHandler(async (req, res) => {
  const employees = await Employee.find({});
  if (employees) {
    res.json(employees);
  } else {
    res.status(500);
    throw new Error('Something went wrong!');
  }
});

//@desc get employee by Id
//@route GET api/employee/:id
//@access public

const getEmployeeById = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404);
    throw new Error('Employee not found!');
  }
});

//@desc create employee
//@route POST api/employee
//@access public

const createEmployee = asyncHandler(async (req, res) => {
  const { name, email, age, address, photo, birth_date } = req.body;

  const employeeExist = await Employee.findOne({ email });

  if (employeeExist) {
    res.status(400);
    throw new Error('Employee already exists');
  }
  const employee = await Employee.create({
    name,
    email,
    age,
    address,
    photo,
    birth_date,
  });
  if (employee) {
    res.status(201).json({
      _id: employee._id,
      name: employee.name,
      email: employee.email,
      age: employee.age,
      address: employee.address,
      photo: employee.photo,
      birth_date: employee.birth_date,
    });
  } else {
    res.status(400);
    throw new Error('Invalid employee data');
  }
});

//@desc update employee
//@route PUT api/employee/:id
//@access public

const updateEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.body._id);
  if (employee) {
    employee.name = req.body.name || employee.name;
    employee.email = req.body.email || employee.email;
    employee.photo = req.body.photo || employee.photo;
    employee.address = req.body.address || employee.address;
    employee.age = req.body.age || employee.age;
    employee.birth_date = req.body.birth_date || employee.birth_date;

    const updatedEmployee = await employee.save();

    const employees = await Employee.find({});

    res.json(employees);
  } else {
    res.status(404);
    throw new Error('Employee not found');
  }
});

//@desc delete employee
//@route DELETE api/employee/:id
//@access public

const deleteEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (employee) {
    await employee.deleteOne();
    const employees = await Employee.find({});
    res.json(employees);
  } else {
    res.status(404);
    throw new Error('Employee not Found');
  }
});

export {
  getEmployeeList,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
