import { FC } from "react";
import EmployeeManagementTabs from "../../uix/crud/employee/EmployeeManagementTabs";

interface TEmployeeProps {}

const Employee: FC<TEmployeeProps> = (props: TEmployeeProps) => {
  return (
    <div className='flex flex-col items-center mt-1'>
      <h1 className='w-full max-w-7xl mx-auto shadow px-2 rounded-md py-1 text-center font-bold'>
        Employees
      </h1>
      <div className='w-full mt-1'>
        <EmployeeManagementTabs />
      </div>
    </div>
  );
};

export default Employee;
