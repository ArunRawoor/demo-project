import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CombinedForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        employeeId: '',
        employeeName: '',
        accountNumber: '',
        bankName: '',
        UANNumber: '',
        workingDays: '',
        department: '',
        designation: '',
        year: '',
        month: '',
        houseRentAllowance: '',
        medicalAllowance: '',
        dearnessAllowance: '',
        travellingAllowance: '',
        basicSalary: '',
        grossSalary: '',
        netSalary: '',
        totalAllowance: '',
        pf: '',
        professionalTax: '',
        others: ''
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const calculateSalary = () => {
        const totalAllowances =
            parseInt(formData.houseRentAllowance) +
            parseInt(formData.medicalAllowance) +
            parseInt(formData.dearnessAllowance) +
            parseInt(formData.travellingAllowance);

        const grossSalary =
            parseInt(formData.basicSalary) + totalAllowances;

        const netSalary =
            grossSalary -
            parseInt(formData.pf) -
            parseInt(formData.professionalTax) -
            parseInt(formData.others);

        return {
            totalAllowance: totalAllowances,
            grossSalary: grossSalary,
            netSalary: netSalary
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { totalAllowance, grossSalary, netSalary } = calculateSalary();

            const updatedFormData = {
                ...formData,
                totalAllowance: totalAllowance,
                grossSalary: grossSalary,
                netSalary: netSalary
            };


            await axios.post('http://localhost:5000/api/payslip', updatedFormData);
            navigate('/DisplaySalaryData');
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return (
        <div>
            <h2>Enter Pay Slip and Salary Details</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="employeeId" value={formData.employeeId} onChange={handleInputChange} placeholder="Employee ID" />
                <input type="text" name="employeeName" value={formData.employeeName} onChange={handleInputChange} placeholder="Employee Name" />
                <select name="department" value={formData.department} onChange={handleInputChange}>
                    <option value="">Select Department</option>
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    {/* Add other options */}
                </select>
                <select name="designation" value={formData.designation} onChange={handleInputChange}>
                    <option value="">Select Designation</option>
                    <option value="Manager">Manager</option>
                    <option value="Developer">Developer</option>
                    {/* Add other options */}
                </select>
                <select name="month" value={formData.month} onChange={handleInputChange}>
                    <option value="">Select Month</option>
                    {months.map((month, index) => (
                        <option key={index} value={month}>
                            {month}
                        </option>
                    ))}
                </select>

                <select name="year" value={formData.year} onChange={handleInputChange}>
                    <option value="">Select Year</option>
                    {Array.from({ length: 9 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
                <input type="number" name="workingDays" value={formData.workingDays} onChange={handleInputChange} placeholder="Working Days" />

                <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleInputChange} placeholder="Account Number" />
                <input type="text" name="bankName" value={formData.bankName} onChange={handleInputChange} placeholder="Bank Name" />
                <input type="text" name="UANNumber" value={formData.UANNumber} onChange={handleInputChange} placeholder="UAN Number" />

                <input type="number" name="houseRentAllowance" value={formData.houseRentAllowance} onChange={handleInputChange} placeholder="House Rent Allowance" />
                <input type="number" name="medicalAllowance" value={formData.medicalAllowance} onChange={handleInputChange} placeholder="Medical Allowance" />
                <input type="number" name="dearnessAllowance" value={formData.dearnessAllowance} onChange={handleInputChange} placeholder="Dearness Allowance" />
                <input type="number" name="travellingAllowance" value={formData.travellingAllowance} onChange={handleInputChange} placeholder="Travelling Allowance" />
                <input type="number" name="basicSalary" value={formData.basicSalary} onChange={handleInputChange} placeholder="Basic Salary" />
                <input type="number" name="pf" value={formData.pf} onChange={handleInputChange} placeholder="PF" />
                <input type="number" name="professionalTax" value={formData.professionalTax} onChange={handleInputChange} placeholder="Professional Tax" />
                <input type="number" name="others" value={formData.others} onChange={handleInputChange} placeholder="Others" />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CombinedForm;