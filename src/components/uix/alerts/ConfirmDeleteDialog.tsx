import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../ui/alert-dialog";
import { Button } from "../../../components/ui/button";

interface ConfirmDeleteDialogProps {
  onConfirm: () => void;
  trigger: React.ReactNode;
}

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({ onConfirm, trigger }) => (
  <AlertDialog>
    <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader className='flex'>
        <div className='flex align-middle justify-between'>
          <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
          <span className='relative h-4 w-4 rounded-full'>
            <span className='animate-ping absolute h-full w-full rounded-full bg-red-400 opacity-75'></span>
          </span>
        </div>
      </AlertDialogHeader>
      <AlertDialogDescription>
        <span className='text-destructive'>Are you sure you want to delete this employee ?</span>
        <br />
        This action cannot be undone.
      </AlertDialogDescription>
      <AlertDialogFooter>
        <AlertDialogCancel asChild>
          <Button variant='outline'>Cancel</Button>
        </AlertDialogCancel>
        <AlertDialogAction asChild>
          <Button
            variant='destructive'
            className='bg-destructive/50 hover:bg-destructive'
            onClick={onConfirm}
          >
            Delete
          </Button>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export default ConfirmDeleteDialog;
