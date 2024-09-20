import { faker } from "@faker-js/faker";
import { EmployeeCreateType } from "../../../../../types/types";

const generateRandomEmployee = (): EmployeeCreateType => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    dateOfBirth: faker.date.birthdate({ min: 18, max: 100, mode: "age" }),
    startDate: faker.date.between({
      from: "2018-01-01T00:00:00.000Z",
      to: new Date().toISOString(),
    }),
    department: faker.commerce.department(),
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode("#####"),
  };
};

export default generateRandomEmployee;
