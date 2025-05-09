// DialogComponent.tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DataForm } from "./form";

type DialogComponentProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const AddWallet = ({ open, onOpenChange }: DialogComponentProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Add Wallet</DialogTitle>
        <DialogDescription>
          Add a crypto wallet. Click save when you're done.
        </DialogDescription>
        <DataForm />
      </DialogContent>
    </Dialog>
  );
};
