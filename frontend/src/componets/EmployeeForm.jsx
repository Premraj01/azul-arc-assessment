import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import moment from 'moment';
import axios from 'axios';
import { FaUser } from 'react-icons/fa';

const EmployeeForm = ({
  show,
  handleClose,
  employee = {},
  isEdit,
  addEmployee,
  updateEmployee,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    if (employee) {
      setName(employee.name);
      setEmail(employee.email);
      setBirthDate(moment(new Date(employee.birth_date)).format('YYYY-MM-DD'));
      setAddress(employee.address);
      setAge(employee.age);
    }
  }, [employee]);

  const calculateAge = (date) => {
    let birthDate = moment(date);
    let currentDate = moment(new Date());
    setBirthDate(moment(new Date(date)).format('YYYY-MM-DD'));
    setAge(currentDate.diff(birthDate, 'years'));
  };
  const handleSubmit = async () => {
    if (isEdit) {
      updateEmployee({
        _id: employee._id,
        name,
        email,
        address,
        birthDate,
        age,
      });
    } else {
      addEmployee({
        name,
        email,
        address,
        birthDate,
        age,
      });
      setName('');
      setAddress('');
      setEmail('');
      setAge('');
      setBirthDate('');
    }

    handleClose(false);
  };
  const uploadImage = (e) => {};

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>
          <FaUser /> &nbsp; Employee Form
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col>
              <Form.Group
                className='mb-3'
                controlId='exampleForm.ControlInput1'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='Name'
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                className='mb-3'
                controlId='exampleForm.ControlInput1'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='text'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Email'
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group
                className='mb-3'
                controlId='exampleForm.ControlInput1'>
                <Form.Label>Birth Date</Form.Label>
                <Form.Control
                  type='date'
                  value={birthDate}
                  onChange={(e) => calculateAge(e.target.value)}
                  placeholder='Birth Date'
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                className='mb-3'
                controlId='exampleForm.ControlInput1'>
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Age'
                  value={age}
                  disabled
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group
                className='mb-3'
                controlId='exampleForm.ControlInput1'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type='text'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder='Address'
                  required
                />
              </Form.Group>
            </Col>
            <Col></Col>
          </Row>{' '}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
        <Button variant='primary' type='submit' onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmployeeForm;
