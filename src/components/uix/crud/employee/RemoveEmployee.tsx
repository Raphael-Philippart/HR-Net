import { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { deleteEmployee } from "../../../../store/thunks/employeeThunk";
import { Button } from "../../../ui/button";

interface TRemoveEmployeeProps {}

const RemoveEmployee: FC<TRemoveEmployeeProps> = (props: TRemoveEmployeeProps) => {
  const dispatch = useAppDispatch();
  const employees = useAppSelector((state) => state.employee.employees);
  const [loading, setLoading] = useState(false);

  const handleDeleteAll = async () => {
    setLoading(true);
    try {
      for (const employee of employees) {
        await dispatch(deleteEmployee(employee.id!)).unwrap();
      }
    } catch (error) {
      console.error("Failed to delete employees:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='my-4'>
      <Button
        type='button'
        variant='outline'
        onClick={handleDeleteAll}
        disabled={loading}
        className='hover:bg-destructive/15'
      >
        {loading ? "Deleting..." : "Delete All Employees"}
      </Button>
    </div>
  );
};

export default RemoveEmployee;
