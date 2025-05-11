// DialogComponent.tsx
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DataForm } from "./form";

type DialogComponentProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const AddDeposit = ({ open, onOpenChange }: DialogComponentProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
      <DialogHeader>
          <DialogTitle>Create Deposit</DialogTitle>
          <DialogDescription>
            Create deposit for a client. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <DataForm />
      </DialogContent>
    </Dialog>
  );
};




