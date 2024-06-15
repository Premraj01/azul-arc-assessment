import './App.css';
import Header from './componets/Header';
import { Fragment } from 'react';
import EmployeeList from './componets/EmployeeList';
import { Col, Container, Row } from 'react-bootstrap';

const App = () => {
  return (
    <Fragment>
      <Header />

      <EmployeeList />
    </Fragment>
  );
};

export default App;
