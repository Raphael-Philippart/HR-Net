import React from "react";
import EmployeeTable from "../../../uix/tables/EmployeeDataTable";

const EmployeeList: React.FC = () => {
  return (
    <div>
      <h1>Current Employees</h1>
      <EmployeeTable />
    </div>
  );
};

export default EmployeeList;
