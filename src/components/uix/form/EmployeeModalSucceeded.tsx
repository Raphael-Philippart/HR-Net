import React, { FC } from "react";
import Modal from "../../uix/modal/Modal";
import { useAppSelector } from "../../../store/hooks";
import { selectEmployees } from "../../../store/selectors/employeeSelector";
import { EmployeeType } from "../../../types/types";
import DateDisplay from "../../uix/date_display/DateDisplay";

const renderEmployee = (employee: EmployeeType) => {
  return (
    <span>
      {`${employee.lastName} ${employee.firstName}`}
      <br />
      <>
        Start Date: <DateDisplay isoDate={employee.startDate} />
      </>
      <br />
      <br />
      <>Has been created successfully !</>
    </span>
  );
};

const EmployeeModalSucceeded: FC = () => {
  const employee = useAppSelector(selectEmployees);

  return (
    <Modal
      showTime={true}
      isOpen={true}
      title='Employee Created'
      content={renderEmployee(employee[0])}
    />
  );
};

export default EmployeeModalSucceeded;
