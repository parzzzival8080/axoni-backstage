// AddPair.tsx

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DataForm } from "./form";
import { Pair } from "./columns";

interface EditPairProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pair: Pair;
  onSuccess?: () => void; // 👈 This is needed
}

export const AddPair = ({ open, onOpenChange, pair }: EditPairProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set Pairs</DialogTitle>
          <DialogDescription>Set Buy and Sell Limit</DialogDescription>
        </DialogHeader>
        <DataForm
          pair={pair}
          onSuccess={() => {
            onOpenChange(false); // ✅ Closes the modal
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
