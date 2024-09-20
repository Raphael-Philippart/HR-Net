import { createSelector } from "reselect";
import { RootState } from "../../store/store";
import { EmployeeType } from "../../types/types";

// Sélecteur pour obtenir la liste des employés
export const selectEmployees = (state: RootState) => state.employee.employees;

// Sélecteur pour obtenir l'état et l'erreur des employés
export const selectEmployeeState = createSelector(
  [(state: RootState) => state.employee.status, (state: RootState) => state.employee.error],
  (status, error) => ({ status, error }),
);

// Sélecteur pour vérifier si les données des employés sont en cours de chargement
export const selectEmployeeLoading = createSelector(
  [(state: RootState) => state.employee.status],
  (status) => status === "loading",
);

// Sélecteur pour obtenir un employé par ID
export const selectEmployeeById = (employeeId: number) =>
  createSelector(
    [selectEmployees],
    (employees: EmployeeType[]) => employees.find((employee) => employee.id === employeeId) || null,
  );
