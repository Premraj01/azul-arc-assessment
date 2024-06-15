import React, { useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useAPI } from '../context/EmployeeContext';
import moment from 'moment';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import EmployeeForm from './EmployeeForm';

const EmployeeList = () => {
  const { employee, deleteEmployee, updateEmployee } = useAPI();
  const [editEmployee, setEditEmployee] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const convertDate = (date) => {
    return moment(new Date(date)).format('YYYY-MM-DD');
  };
  const deleteEmployeeById = (id) => {
    deleteEmployee(id);
  };
  const handleEditEmployee = (employee) => {
    setShow(true);
    setEditEmployee(employee);
  };
  return (
    <Container className='mt-10'>
      <Table striped bordered hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Birth Date</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employee.map((employee, idx) => (
            <tr key={employee._id}>
              <td>{idx + 1}</td>
              <td>{employee.photo}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.age}</td>
              <td>{convertDate(employee.birth_date)}</td>
              <td>{employee.address}</td>
              <td>
                <FaEdit
                  onClick={() => handleEditEmployee(employee)}
                  className='success btn-cursor'
                />
                &nbsp; &nbsp;
                <FaTrashAlt
                  onClick={() => deleteEmployeeById(employee._id)}
                  className='danger btn-cursor'
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <EmployeeForm
        show={show}
        handleClose={handleClose}
        isEdit={true}
        employee={editEmployee}
        updateEmployee={updateEmployee}
      />
    </Container>
  );
};

export default EmployeeList;
