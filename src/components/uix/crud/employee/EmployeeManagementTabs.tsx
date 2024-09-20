import { FC, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../ui/tabs";
import EmployeeCreateForm from "../../../uix/form/EmployeeCreateForm";
import EmployeeList from "../../../uix/crud/employee/ReadEmployee";
import RemoveEmployee from "../../../uix/crud/employee/RemoveEmployee";
import EmployeeAdder from "./fakeData/EmployeeAdder";

interface TEmployeeManagementTabsProps {}

const EmployeeManagementTabs: FC<TEmployeeManagementTabsProps> = (
  props: TEmployeeManagementTabsProps,
) => {
  const [activeTab, setActiveTab] = useState("create");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className='w-full max-w-7xl mx-auto shadow bg-gradient-to-b from-primary/5 px-5 rounded-md py-8 border'>
      <Tabs defaultValue='create' className='w-full' onValueChange={handleTabChange}>
        <TabsList className='shadow bg-gradient-to-b from-primary/10 rounded-md border'>
          <TabsTrigger
            value='create'
            className={`hover:text-primary bg-gradient-to-bl from-primary10 ${activeTab === "create" ? "from-primary/25" : ""}`}
          >
            Create Employee
          </TabsTrigger>
          <TabsTrigger
            value='current'
            className={`hover:text-primary bg-gradient-to-bl from-primary/10 ${activeTab === "current" ? "from-primary/25" : ""}`}
          >
            Current Employee
          </TabsTrigger>
          <TabsTrigger
            value='delete'
            className={`hover:text-primary bg-gradient-to-bl from-primary10 ${activeTab === "delete" ? "from-primary/25" : ""}`}
          >
            Delete Employee
          </TabsTrigger>
          <TabsTrigger
            value='faker'
            className={`hover:text-primary bg-gradient-to-bl from-primary10 ${activeTab === "faker" ? "from-primary/25" : ""}`}
          >
            Fakes Employee
          </TabsTrigger>
        </TabsList>
        <TabsContent value='create' className='w-full max-w-7xl mx-auto'>
          <EmployeeCreateForm />
        </TabsContent>
        <TabsContent value='current'>
          <EmployeeList />
        </TabsContent>
        <TabsContent value='delete'>
          <RemoveEmployee />
        </TabsContent>
        <TabsContent value='faker'>
          <EmployeeAdder />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployeeManagementTabs;
