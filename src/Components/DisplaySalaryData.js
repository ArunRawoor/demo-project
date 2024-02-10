import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './DisplaySalaryData.css';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root'); // Set the root element for accessibility

const DisplaySalaryData = () => {
  const [salaryData, setSalaryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generatedPayslip, setGeneratedPayslip] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(''); // Selected month, e.g., 'January'
  const [selectedYear, setSelectedYear] = useState(''); // Selected year, e.g., '2023'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/payslip');
        setSalaryData(response.data);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter data based on filterValue (employeeId)
    const filtered = salaryData.filter((item) => {
      const employeeId = item.employeeId || '';
      return employeeId.toLowerCase().includes(filterValue.toLowerCase());
    });
    setFilteredData(filtered);
  }, [filterValue, salaryData]);

  useEffect(() => {
    // Trigger payslip generation when selected month or year changes
    if (selectedEmployee) {
      generatePayslip(selectedEmployee);
    }
  }, [selectedMonth, selectedYear]);

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  const openModal = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
    // Generate payslip when modal is opened (initial generation)
    generatePayslip(employee);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setGeneratedPayslip(null); // Clear generated payslip when modal is closed
  };

  const generatePayslip = async (employee) => {
    // Your logic to calculate the payslip based on working days
    // For now, let's assume workingDays is fetched from an API based on the selected month and year
    const workingDays = await fetchWorkingDaysFromAPI(employee.employeeId, selectedMonth, selectedYear);

    // Replace this with the actual API call to get working days from the calendar data
    // const workingDays = getWorkingDaysFromCalendarAPI(selectedMonth, selectedYear);

    const basicSalary = parseFloat(employee.basicSalary) || 0;

    // Calculate payslip fields
    const grossSalary = workingDays * (basicSalary / 30);
    const netSalary = grossSalary - parseFloat(employee.pf) || 0;

    // Set the generated payslip
    setGeneratedPayslip({
      ...employee,
      grossSalary,
      netSalary,
      // Add other payslip details here
    });
  };

  const fetchWorkingDaysFromAPI = async (employeeId, month, year) => {
    // Replace this with the actual API call to get working days from the calendar data
    try {
      const response = await axios.get(`http://localhost:5000/api/calendar?employeeId=${employeeId}&month=${month}&year=${year}`);
      return response.data.workingDays || 0;
    } catch (error) {
      console.error(error);
      // Handle error
      return 0;
    }
  };
  
  return (
    <div>
      <h2>Salary Data</h2>
      <input
        type="text"
        placeholder="Filter by Employee ID"
        value={filterValue}
        onChange={handleFilterChange}
      />
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>EmployeeName</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Month</th>
            <th>Year</th>
            
            <th>Working Days</th>
            <th>Account Number</th>
            <th>Bank Name</th>
            <th>UAN Number</th>
            
            
            <th>House Rent Allowance</th>
            <th>Medical Allowance</th>
            <th>Dearness Allowance</th>
            <th>Travelling Allowance</th>
            <th>Basic Salary</th>
            <th>PF</th>
            <th>Professional Tax</th>
            <th>Others</th>
            <th>Total Allowance</th>

            <th>Gross Salary</th>
            <th>Net Salary</th>
            
            {/* Add other table headers for displayed fields */}
          </tr>
        </thead>
        <tbody>
          {/* {salaryData.map((salaryItem) => (
            <tr key={salaryItem._id}>
               */}
               {filteredData.map((salaryItem) => (
            <tr key={salaryItem._id}>
              <td>{salaryItem.employeeId}</td>
              <td>{salaryItem.employeeName}</td>
              
              <td>{salaryItem.department}</td>
              <td>{salaryItem.designation}</td>
              <td>{salaryItem.month}</td>
              <td>{salaryItem.year}</td>
              <td>{salaryItem.workingDays}</td>
              <td>{salaryItem.accountNumber}</td>
              <td>{salaryItem.bankName}</td>
              <td>{salaryItem.UANNumber}</td>

              <td>{salaryItem.houseRentAllowance}</td>
              <td>{salaryItem.medicalAllowance}</td>
              <td>{salaryItem.dearnessAllowance}</td>
              <td>{salaryItem.travellingAllowance}</td>
              <td>{salaryItem.basicSalary}</td>
              <td>{salaryItem.pf}</td>
              <td>{salaryItem.professionalTax}</td>
              <td>{salaryItem.others}</td>
              <td>{salaryItem.totalAllowance}</td>
              <td>{salaryItem.grossSalary}</td>
              <td>{salaryItem.netSalary}</td>
              <td>
                <button onClick={() => openModal(salaryItem)}>Generate Payslip</button>
              </td>
              
              {/* Add other table cells for displayed fields */}
            </tr>
          ))}
        </tbody>
      </table>

       {/* Modal for displaying payslip */}
       <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Generated Payslip"
      >
        
         {selectedEmployee && (
          <div>
            <h2>Payslip for {selectedEmployee.employeeName}</h2>
            <p className='salary'>Professional Tax: {selectedEmployee.professionalTax}</p>
            <p className='salary'>Others: {selectedEmployee.others}</p>
            <p className='salary'>Total Allowance: {selectedEmployee.totalAllowance}</p>
            <p className='salary'>Gross Salary: {selectedEmployee.grossSalary}</p>
            <p className='salary'>Net Salary: {selectedEmployee.netSalary}</p>
           
           
            {/* Add other payslip details here */}
            <button onClick={closeModal}>Close</button>
          </div>
        )}
        
      </Modal>
    
    </div>
  );
};

export default DisplaySalaryData;