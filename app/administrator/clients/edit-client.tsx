import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { DataForm } from "./form";
import { Client } from "./columns";

interface EditClientProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: Client;
}

export const EditClient = ({ open, onOpenChange, client }: EditClientProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Edit Client</DialogTitle>
        <DialogDescription>
          Edit client. Click save when you're done.
        </DialogDescription>
        <DataForm client={client} />
      </DialogContent>
    </Dialog>
  );
};
