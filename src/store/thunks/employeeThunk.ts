import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addEmployeeToDB,
  deleteEmployeeFromDB,
  getEmployeesFromDB,
  updateEmployeeInDB,
} from "../actions/employeeAction";
import { EmployeeCreateType, EmployeeType } from "../../types/types";

export const createEmployee = createAsyncThunk(
  "employee/createEmployee",
  async (employeeData: EmployeeCreateType, { rejectWithValue }) => {
    try {
      return await addEmployeeToDB(employeeData);
    } catch (error) {
      // Si l'erreur est une instance d'Error, retournez le message de l'erreur
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      // Sinon, retournez un message d'erreur générique
      return rejectWithValue("Failed to create employee");
    }
  },
);

export const updateEmployee = createAsyncThunk(
  "employee/updateEmployee",
  async (employeeData: EmployeeType, { rejectWithValue }) => {
    try {
      return await updateEmployeeInDB(employeeData);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to update employee");
    }
  },
);

export const fetchEmployees = createAsyncThunk(
  "employee/fetchEmployees",
  async (_, { rejectWithValue }) => {
    try {
      return await getEmployeesFromDB();
    } catch (error) {
      return rejectWithValue("Failed to fetch employees");
    }
  },
);

export const deleteEmployee = createAsyncThunk(
  "employee/deleteEmployee",
  async (id: number, { rejectWithValue }) => {
    try {
      await deleteEmployeeFromDB(id);
      return id;
    } catch (error) {
      return rejectWithValue("Failed to delete employee");
    }
  },
);
