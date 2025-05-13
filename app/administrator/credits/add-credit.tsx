import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DataForm } from "./form";

type DialogComponentProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  refetch: () => void;
};

export const AddCredit = ({ open, onOpenChange, refetch }: DialogComponentProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Credit</DialogTitle>
          <DialogDescription>
            Create credit for a client. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <DataForm onSuccess={() => {
          refetch();
          onOpenChange(false);
        }} />
      </DialogContent>
    </Dialog>
  );
};
