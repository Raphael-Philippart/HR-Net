import dbPromise from "../../indexedDB";
import { EmployeeCreateType, EmployeeType, EmployeeViewRenderType } from "../../types/types";

export const addEmployeeToDB = async (
  employee: EmployeeCreateType,
): Promise<EmployeeViewRenderType> => {
  const db = await dbPromise;

  const serializedEmployee = {
    ...employee,
    dateOfBirth: employee.dateOfBirth.toISOString(),
    startDate: employee.startDate.toISOString(),
  };

  return new Promise<EmployeeViewRenderType>((resolve, reject) => {
    const transaction = db.transaction("employees", "readwrite");
    const store = transaction.objectStore("employees");
    const request = store.add(serializedEmployee);

    request.onsuccess = () => {
      resolve({
        ...serializedEmployee,
      });
    };

    request.onerror = (event) => {
      const error = (event.target as IDBRequest).error;

      if (error instanceof DOMException) {
        switch (error.name) {
          case "ConstraintError":
            // Erreur de contrainte unique
            reject(new Error("Unique constraint violation: The employee already exists."));
            break;
          default:
            // Autres erreurs IndexedDB
            reject(new Error(`IndexedDB Error: ${error.name} - ${error.message}`));
            break;
        }
      } else {
        reject(new Error("An unknown error occurred"));
      }
    };
  });
};

export const updateEmployeeInDB = async (
  employee: EmployeeCreateType,
): Promise<EmployeeViewRenderType> => {
  const db = await dbPromise;

  const serializedEmployee = {
    ...employee,
    dateOfBirth: new Date(employee.dateOfBirth).toISOString(),
    startDate: new Date(employee.startDate).toISOString(),
  };

  return new Promise<EmployeeViewRenderType>((resolve, reject) => {
    const transaction = db.transaction("employees", "readwrite");
    const store = transaction.objectStore("employees");
    const request = store.put(serializedEmployee);

    request.onsuccess = () => {
      resolve(serializedEmployee);
    };

    request.onerror = (event) => {
      const error = (event.target as IDBRequest).error;

      if (error instanceof DOMException) {
        switch (error.name) {
          case "ConstraintError":
            reject(new Error("Unique constraint violation: The employee already exists."));
            break;
          default:
            reject(new Error(`IndexedDB Error: ${error.name} - ${error.message}`));
            break;
        }
      } else {
        reject(new Error("An unknown error occurred"));
      }
    };
  });
};

export const getEmployeesFromDB = async (): Promise<EmployeeType[]> => {
  const db = await dbPromise;

  return new Promise<any[]>((resolve, reject) => {
    const transaction = db.transaction("employees", "readonly");
    const store = transaction.objectStore("employees");
    const request = store.getAll();

    request.onsuccess = () => {
      const employees = request.result.map((employee: EmployeeType) => ({
        ...employee,
        dateOfBirth: new Date(employee.dateOfBirth).toISOString(),
        startDate: new Date(employee.startDate).toISOString(),
      }));
      resolve(employees);
    };

    request.onerror = (event) => {
      reject(new Error("Failed to fetch employees from the database."));
    };
  });
};

export const deleteEmployeeFromDB = async (id: number): Promise<void> => {
  const db = await dbPromise;

  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction("employees", "readwrite");
    const store = transaction.objectStore("employees");
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = (event) => reject((event.target as IDBRequest).error);
  });
};
