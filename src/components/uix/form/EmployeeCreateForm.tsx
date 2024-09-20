"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { DateTimePicker } from "react-easy-datetime";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { EmployeeCreateType } from "../../../types/types";
import { EmployeeCreateSchema } from "../../../schemas/employee.schema";
import { createEmployee } from "../../../store/thunks/employeeThunk";
import { useAppSelector } from "../../../store/hooks";
import { selectEmployeeState } from "../../../store/selectors/employeeSelector";
import CustomSelect from "./CustomSelect";
import states from "../../uix/form/states";
import departments from "./departments";
import EmployeeModalSucceeded from "../../uix/form/EmployeeModalSucceeded";
import "../../../css/datepicker.custom.css";

const defaultValues: EmployeeCreateType = {
  firstName: "",
  lastName: "",
  dateOfBirth: new Date(),
  startDate: new Date(),
  department: "",
  street: "",
  city: "",
  state: "",
  zipCode: "",
};

const customizationDataPicker = {
  input: ["input_c"],
  calendar: {
    container: ["container_c"],
    button: ["button_c"],
    selected: ["selected_c"],
    hover: ["hover_c"],
    date: {
      button: ["button_c"],
      dropdown: ["dropdown_c"],
    },
  },
};

const EmployeeCreateForm: React.FC = () => {
  const dispatch = useDispatch();
  const { status, error } = useAppSelector(selectEmployeeState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const form = useForm<EmployeeCreateType>({
    resolver: zodResolver(EmployeeCreateSchema),
    defaultValues,
    mode: "onChange",
  });

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: EmployeeCreateType) => {
    try {
      await dispatch(createEmployee(data) as any);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Failed to create employee:", error);
    }
  };

  return (
    <div className='w-full mx-auto shadow px-3 rounded-md py-5'>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          {/* First Name */}
          <FormField
            control={control}
            name='firstName'
            render={({ field }) => (
              <FormItem className='space-y-0 m-0'>
                <FormLabel className='text-md lg:text-lg'>First Name:</FormLabel>
                <FormControl>
                  <Input type='text' {...field} placeholder='First Name' />
                </FormControl>
                <FormMessage>{errors.firstName?.message || error}</FormMessage>
              </FormItem>
            )}
          />

          {/* Last Name */}
          <FormField
            control={control}
            name='lastName'
            render={({ field }) => (
              <FormItem className='space-y-0 m-0'>
                <FormLabel className='text-md lg:text-lg'>Last Name:</FormLabel>
                <FormControl>
                  <Input type='text' {...field} placeholder='Last Name' />
                </FormControl>
                <FormMessage>{errors.lastName?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* Date of Birth */}
          <FormField
            control={control}
            name='dateOfBirth'
            render={({ field }) => (
              <FormItem className='space-y-0 m-0'>
                <FormLabel className='text-md lg:text-lg'>Date of Birth:</FormLabel>
                <FormControl>
                  <DateTimePicker
                    value={field.value || new Date()}
                    onChange={(date: any) => setValue("dateOfBirth", date)}
                    customization={customizationDataPicker}
                    aria-label='Sélectionner une date de naissance'
                  />
                </FormControl>
                <FormMessage>{errors.dateOfBirth?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* Start Date */}
          <FormField
            control={control}
            name='startDate'
            render={({ field }) => (
              <FormItem className='space-y-0 m-0'>
                <FormLabel className='text-md lg:text-lg'>Start Date:</FormLabel>
                <FormControl>
                  <DateTimePicker
                    value={field.value || new Date()}
                    onChange={(date: any) => setValue("startDate", date)}
                    customization={customizationDataPicker}
                    aria-label='Sélectionner une date de début'
                  />
                </FormControl>
                <FormMessage>{errors.startDate?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* Address */}
          <div className='p-4 border rounded-md bg-gradient-to-b from-primary/5 shadow-sm'>
            <FormLabel className='text-md lg:text-lg'>Address</FormLabel>

            {/* Street */}
            <FormField
              control={control}
              name='street'
              render={({ field }) => (
                <FormItem className='space-y-0 m-0'>
                  <FormLabel className='text-md lg:text-lg'>Street</FormLabel>
                  <FormControl>
                    <Input type='text' {...field} placeholder='Street' />
                  </FormControl>
                  <FormMessage>{errors.street?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* City */}
            <FormField
              control={control}
              name='city'
              render={({ field }) => (
                <FormItem className='space-y-0 m-0'>
                  <FormLabel className='text-md lg:text-lg'>City</FormLabel>
                  <FormControl>
                    <Input type='text' {...field} placeholder='City' />
                  </FormControl>
                  <FormMessage>{errors.city?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* State */}
            <FormField
              control={control}
              name='state'
              aria-label='Sélectionner un état'
              render={({ field }) => (
                <FormItem className='space-y-0 m-0'>
                  <FormLabel className='text-md lg:text-lg'>State</FormLabel>
                  <FormControl>
                    <CustomSelect name='state' label='State' control={control} options={states} />
                  </FormControl>
                  <FormMessage>{errors.state?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Zip Code */}
            <FormField
              control={control}
              name='zipCode'
              render={({ field }) => (
                <FormItem className='space-y-0 m-0'>
                  <FormLabel className='text-md lg:text-lg'>Zip Code</FormLabel>
                  <FormControl>
                    <Input type='text' {...field} placeholder='Zip Code' />
                  </FormControl>
                  <FormMessage>{errors.zipCode?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>

          {/* Department */}
          <FormField
            control={control}
            name='department'
            aria-label='Sélectionner un département'
            render={({ field }) => (
              <FormItem className='space-y-0 m-0'>
                <FormLabel className='text-md lg:text-lg'>Department</FormLabel>
                <FormControl>
                  <CustomSelect
                    name='department'
                    label='Department'
                    control={control}
                    options={departments}
                  />
                </FormControl>
                <FormMessage>{errors.department?.message}</FormMessage>
              </FormItem>
            )}
          />

          <Button type='submit' variant='outline' className='hover:text-primary'>
            {status === "loading" ? "Saving..." : "Save"}
          </Button>
        </form>
      </Form>

      {isModalOpen && <EmployeeModalSucceeded />}
    </div>
  );
};

export default EmployeeCreateForm;
