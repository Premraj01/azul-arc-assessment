import React, { Fragment, useState } from 'react';
import { Button, Container, Modal, Nav, Navbar } from 'react-bootstrap';
import EmployeeForm from './EmployeeForm';
import { useAPI } from '../context/EmployeeContext';

const Header = () => {
  const { addEmployee } = useAPI();
  const [employee] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Fragment>
      <header>
        <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
          <Container>
            <Navbar.Brand>Employee Management</Navbar.Brand>

            <Nav>
              <Nav.Item onClick={handleShow}>Add Employee</Nav.Item>
            </Nav>
            <EmployeeForm
              show={show}
              handleClose={handleClose}
              isEdit={false}
              employee={employee}
              addEmployee={addEmployee}
            />
          </Container>
        </Navbar>
      </header>
    </Fragment>
  );
};

export default Header;
