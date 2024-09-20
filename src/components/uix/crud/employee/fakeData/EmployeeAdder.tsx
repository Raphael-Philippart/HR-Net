import React, { useState } from "react";
import { addEmployeeToDB } from "../../../../../store/actions/employeeAction";
import { Button } from "../../../../ui/button";
import generateRandomEmployee from "./fakesEmployee";

const EmployeeAdder: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [timeTaken, setTimeTaken] = useState<number | null>(null);

  const addMultipleEmployeesToDB = async (count: number): Promise<void> => {
    for (let i = 0; i < count; i++) {
      const randomEmployee = generateRandomEmployee();
      try {
        await addEmployeeToDB(randomEmployee);
      } catch (error) {
        console.error(`Failed to add employee ${i + 1}:`, error);
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setCount(isNaN(value) ? 0 : value);
  };

  const handleAddEmployees = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    setTimeTaken(null);

    const startTime = new Date().getTime();

    try {
      await addMultipleEmployeesToDB(count);
      const endTime = new Date().getTime();
      setTimeTaken(endTime - startTime);
      setSuccess(`${count} employees added successfully.`);
    } catch (error) {
      setError(`Error adding employees: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <h2>Add Fake Employees</h2>
        <div className='flex gap-2'>
          <input
            type='number'
            value={count}
            onChange={handleInputChange}
            min='1'
            placeholder='Enter number of employees'
          />
          <Button
            variant='outline'
            className='hover:bg-green-500/15 p-2'
            onClick={handleAddEmployees}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Employees"}
          </Button>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        {timeTaken !== null && <p style={{ color: "blue" }}>Time taken: {timeTaken} ms</p>}
      </div>
    </div>
  );
};

export default EmployeeAdder;
