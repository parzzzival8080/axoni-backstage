// DialogComponent.tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DataForm } from "./form";
import { useTransition } from "react";

type DialogComponentProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  refetch?: () => void;
};

export const AddDeposit = ({ open, onOpenChange }: DialogComponentProps) => {
  const [_, startTransition] = useTransition();

  const handleSuccess = () => {
    startTransition(() => {
      onOpenChange(false);  // ✅ Close dialog
      window.location.reload(); // ✅ Refresh page or trigger your refetch logic
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Deduction</DialogTitle>
          <DialogDescription>
            Create deduction for a client. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <DataForm onSuccess={handleSuccess} /> {/* ✅ pass onSuccess */}
      </DialogContent>
    </Dialog>
  );
};

