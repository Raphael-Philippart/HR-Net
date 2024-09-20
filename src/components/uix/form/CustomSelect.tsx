import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Control, Controller } from "react-hook-form";

interface CustomSelectProps {
  name: string;
  label: string;
  control: Control<any>;
  options: { name: string; abbreviation?: string }[];
}

const CustomSelect: React.FC<CustomSelectProps> = ({ name, label, control, options }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className='space-y-1'>
          <SelectGroup>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder={`Select ${label}`} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem
                    key={option.abbreviation || option.name}
                    value={option.abbreviation || option.name}
                  >
                    {option.name} {option.abbreviation ? `(${option.abbreviation})` : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </SelectGroup>
        </div>
      )}
    />
  );
};

export default CustomSelect;
