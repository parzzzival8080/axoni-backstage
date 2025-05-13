import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { DataForm } from "./form";
import { Client } from "./columns";
import { DataTable } from "./data-table";

interface EditClientProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: Client;
}

export const Assets = ({ open, onOpenChange, client }: EditClientProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Edit Client</DialogTitle>
        <DialogDescription>
          Client Assets.
          <DataTable columns={columns} data={data} />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
