// DialogComponent.tsx
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DataForm } from "./form";
import { Coin } from "./columns";

interface EditCryptoProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  coin: Coin;
}

export const AddCrypto = ({ open, onOpenChange, coin }: EditCryptoProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
      <DialogTitle>Create Cryptocurrency</DialogTitle>
          <DialogDescription>
            Create Cryptocurrency. Click save when you're done.
          </DialogDescription>
        <DataForm coin={coin} />
      </DialogContent>
    </Dialog>
  );
};




