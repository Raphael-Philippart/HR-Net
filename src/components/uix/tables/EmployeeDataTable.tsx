import React, { useEffect, useMemo, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { deleteEmployee, fetchEmployees } from "../../../store/thunks/employeeThunk";
import { selectEmployees, selectEmployeeState } from "../../../store/selectors/employeeSelector";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { EmployeeType } from "../../../types/types";
import { Input } from "../../../components/ui/input";
import { BsListColumnsReverse } from "react-icons/bs";
import DateDisplay from "../../../components/uix/date_display/DateDisplay";
import EmployeeModalView from "../../../components/uix/form/EmployeeModalView";
import ConfirmDeleteDialog from "../../../components/uix/alerts/ConfirmDeleteDialog";

const EmployeeTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const employees = useAppSelector(selectEmployees);
  const { status, error } = useAppSelector(selectEmployeeState);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
  const [isViewModalOpen, setViewIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleDelete = async (id: number) => {
    await dispatch(deleteEmployee(id));
  };

  const handleRowClick = (employeeId: number) => {
    setSelectedEmployeeId(employeeId);
    setViewIsModalOpen(true);
  };

  const closeModal = () => {
    setViewIsModalOpen(false);
    setSelectedEmployeeId(null);
  };

  const columns = useMemo<ColumnDef<EmployeeType>[]>(
    () => [
      {
        accessorKey: "lastName",
        header: "Last Name",
        cell: ({ row }) => (
          <span
            onClick={() => handleRowClick(row.original.id)}
            className='cursor-pointer text-blue-500'
          >
            {row.original.lastName}
          </span>
        ),
      },
      { accessorKey: "firstName", header: "First Name" },
      {
        accessorKey: "dateOfBirth",
        header: "Date of Birth",
        cell: ({ row }) => <DateDisplay isoDate={row.original.dateOfBirth} />,
      },
      {
        accessorKey: "startDate",
        header: "Start Date",
        cell: ({ row }) => <DateDisplay isoDate={row.original.startDate} showTime={true} />,
      },
      { accessorKey: "department", header: "Department" },
      { accessorKey: "street", header: "Street" },
      { accessorKey: "city", header: "City" },
      { accessorKey: "state", header: "State" },
      { accessorKey: "zipCode", header: "Zip Code" },
      {
        header: "Actions",
        id: "actions",
        cell: ({ row }) => (
          <div className='flex justify-end'>
            <ConfirmDeleteDialog
              trigger={
                <Button variant='outline' className='m-0 p-1 hover:bg-destructive/15'>
                  Delete
                </Button>
              }
              onConfirm={() => handleDelete(row.original.id)}
            />
          </div>
        ),
      },
    ],
    [dispatch],
  );

  const filteredEmployees = useMemo(() => {
    if (!globalFilter) return employees;
    return employees.filter((employee) =>
      Object.values(employee).some((value) =>
        String(value).toLowerCase().includes(globalFilter.toLowerCase()),
      ),
    );
  }, [employees, globalFilter]);

  const table = useReactTable({
    data: filteredEmployees,
    columns,
    state: {
      sorting,
      pagination,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <div>
      <div className='w-full'>
        <div className='flex justify-center items-center py-4'>
          <Input
            type='text'
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder='Search:'
            className='p-2 max-w-sm border'
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' className='ml-auto'>
                <BsListColumnsReverse />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className='capitalize'
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Table className='w-full'>
        <TableCaption>Current Employees</TableCaption>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  colSpan={header.colSpan}
                  onClick={header.column.getToggleSortingHandler()}
                  className='select-none cursor-pointer'
                >
                  {header.isPlaceholder ? null : (
                    <>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                    </>
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className='p-0'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className='flex justify-between'>
        <div className='flex gap-1 items-center'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className='cursor-pointer hover:text-primary bg-gradient-to-bl from-primary/25'
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className='cursor-pointer hover:text-primary bg-gradient-to-bl from-primary/25'
          >
            Next
          </Button>
          <span className='text-sm text-gray-700'>
            Page{" "}
            <strong>
              {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </strong>{" "}
          </span>
        </div>
        <Select
          value={table.getState().pagination.pageSize.toString()}
          onValueChange={(value) => table.setPageSize(Number(value))}
        >
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Select page size' />
          </SelectTrigger>
          <SelectContent>
            {[10, 20, 30, 40, 50, 100].map((pageSize) => (
              <SelectItem key={pageSize} value={pageSize.toString()}>
                Show {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {isViewModalOpen && selectedEmployeeId && (
        <EmployeeModalView employeeId={selectedEmployeeId} onClose={closeModal} />
      )}
    </div>
  );
};

export default EmployeeTable;
