import { z } from "zod";

const EmployeeSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  dateOfBirth: z.date(),
  startDate: z.date(),
  department: z.string(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
});

const EmployeeViewRenderSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  dateOfBirth: z.string(),
  startDate: z.string(),
  department: z.string(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
});

const EmployeeCreateSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is required" }),
  lastName: z.string().min(1, { message: "Last Name is required" }),
  dateOfBirth: z.date({ required_error: "Date of Birth is required" }),
  startDate: z.date({ required_error: "Start Date is required" }),
  department: z.string().min(1, { message: "Department is required" }),
  street: z.string().min(1, { message: "Street is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  zipCode: z.string().min(1, { message: "Zip Code is required" }),
});

export { EmployeeSchema, EmployeeCreateSchema, EmployeeViewRenderSchema };
