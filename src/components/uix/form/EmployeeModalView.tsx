import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { EmployeeType } from "../../../types/types";
import DateDisplay from "../../uix/date_display/DateDisplay";
import Modal from "../../uix/modal/Modal";

interface EmployeeModalViewProps {
  employeeId: number;
  onClose: () => void;
}

const renderEmployee = (employee: EmployeeType) => {
  return (
    <span>
      {`${employee.lastName} ${employee.firstName}`}
      <br />
      <>
        Start Date: <DateDisplay isoDate={employee.startDate} />
        <br />
        Bird Date: <DateDisplay isoDate={employee.dateOfBirth} />
      </>
      <br />
      <>Department: {employee.department}</>
      <br />
      <>
        Address: {employee.street} {employee.city} {employee.state} {employee.zipCode}
      </>
    </span>
  );
};

const EmployeeModalView: React.FC<EmployeeModalViewProps> = ({ employeeId, onClose }) => {
  const employee: EmployeeType | undefined = useSelector((state: RootState) =>
    state.employee.employees.find((emp) => emp.id === employeeId),
  );

  return (
    <Modal
      showTime={false}
      isOpen={true}
      onClose={onClose}
      title='Employee'
      content={renderEmployee(employee as EmployeeType)}
    />
  );
};

export default EmployeeModalView;
