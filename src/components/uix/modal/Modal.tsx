import { FC, ReactNode, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../../ui/dialog";
import DateDisplay from "../../uix/date_display/DateDisplay";

interface TModalProps {
  title: string;
  content: ReactNode;
  isOpen: boolean;
  showTime: boolean;
  onClose?: (() => void) | boolean;
}

const Modal: FC<TModalProps> = ({ title, content, isOpen, showTime, onClose }: TModalProps) => {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setOpen(false);
    if (typeof onClose === "function") {
      onClose();
    } else if (onClose === true) {
      console.log("Modal close triggered by boolean flag");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <div>
        <DialogContent className='bg-gradient-to-b from-primary/15 p-6 rounded-lg'>
          <DialogTitle>{title}</DialogTitle>
          {content}
          <DialogDescription className='italic'>
            {showTime && <DateDisplay isoDate={new Date()} showTime={true} />}
          </DialogDescription>
        </DialogContent>
      </div>
    </Dialog>
  );
};
export default Modal;
