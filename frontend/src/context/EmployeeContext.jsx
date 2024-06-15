import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const APIContext = createContext();
const EmployeeContext = ({ children }) => {
  const [employee, setEmployee] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.get(
        'http://localhost:8080/api/employees',
        config
      );
      setEmployee(data);
    };
    fetchData();
  }, []);

  const addEmployee = async (emp) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const { data } = await axios.post(
        'http://localhost:8080/api/employees',
        {
          name: emp.name,
          email: emp.email,
          birth_date: emp.birthDate,
          address: emp.address,
          age: emp.age,
          photo: '.jpg',
        },
        config
      );
      console.log(data);
      setEmployee([data, ...employee]);
    } catch (error) {
      console.log(error);
    }
  };

  const updateEmployee = async (emp) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const { data } = await axios.put(
        'http://localhost:8080/api/employees',
        {
          _id: emp._id,
          name: emp.name,
          email: emp.email,
          birth_date: emp.birthDate,
          address: emp.address,
          age: emp.age,
          photo: '.jpg',
        },
        config
      );
      setEmployee([...data]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEmployee = async (employeeId) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    console.log('em', employeeId);
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/employees/${employeeId}`,
        config
      );
      setEmployee(data);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async () => {};

  return (
    <APIContext.Provider
      value={{
        employee,
        addEmployee,
        deleteEmployee,
        updateEmployee,
      }}>
      {children}
    </APIContext.Provider>
  );
};

export default EmployeeContext;

export function useAPI() {
  const context = useContext(APIContext);
  if (context === undefined) {
    throw new Error('Context must be used within a Provider');
  }
  return context;
}
