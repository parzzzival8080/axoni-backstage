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
import { Pair } from "./columns";

interface EditPairProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pair: Pair;
};

export const AddPair = ({ open, onOpenChange, pair }: EditPairProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Pair</DialogTitle>
          <DialogDescription>
            Create CryptoPair. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <DataForm pair={pair} />
      </DialogContent>
    </Dialog>
  );
};
