import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createEmployee,
  deleteEmployee,
  fetchEmployees,
  updateEmployee,
} from "../thunks/employeeThunk";
import { EmployeeType } from "../../types/types";

interface EmployeeState {
  employees: EmployeeType[];
  selectedEmployee: EmployeeType | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: EmployeeState = {
  employees: [],
  selectedEmployee: null,
  status: "idle",
  error: null,
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setSelectedEmployee(state, action: PayloadAction<EmployeeType | null>) {
      state.selectedEmployee = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchEmployees
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action: PayloadAction<EmployeeType[]>) => {
        state.status = "succeeded";
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });

    // Handle createEmployee
    builder
      .addCase(createEmployee.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createEmployee.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.employees.push(action.payload);
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });

    // Handle updateEmployee
    builder
      .addCase(updateEmployee.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateEmployee.fulfilled, (state, action: PayloadAction<any | string>) => {
        state.status = "succeeded";
        // Even though the actual update happens in IndexedDB, we might still want to reflect the operation status
        if (typeof action.payload !== "string") {
          const index = state.employees.findIndex((emp) => emp.id === action.payload.id);
          if (index !== -1) {
            state.employees[index] = action.payload;
          }
        }
        state.error = null;
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });

    // Handle deleteEmployee
    builder
      .addCase(deleteEmployee.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = "succeeded";
        state.employees = state.employees.filter((emp) => emp.id !== action.payload);
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
