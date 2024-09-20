import { z } from "zod";
import {
  EmployeeCreateSchema,
  EmployeeSchema,
  EmployeeViewRenderSchema,
} from "../schemas/employee.schema";

export type EmployeeType = z.infer<typeof EmployeeSchema>;
export type EmployeeCreateType = z.infer<typeof EmployeeCreateSchema>;
export type EmployeeViewRenderType = z.infer<typeof EmployeeViewRenderSchema>;
