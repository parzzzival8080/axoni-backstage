// DialogComponent.tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DataForm } from "./form-price";
import { Trend } from "./columns";

type TrendPairProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trend: Trend; // receive the trend (coin) data
};

export const SetPrice = ({ open, onOpenChange, trend }: TrendPairProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Trend Pair</DialogTitle>
        <DialogDescription>
          Set Min/Max Price. Click save when you're done.
        </DialogDescription>
        <DataForm trend={trend}/>
      </DialogContent>
    </Dialog>
  );
};
