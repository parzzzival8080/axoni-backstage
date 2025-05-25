"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import axios from "axios";
import { toast } from "sonner"; // or your toast source

export type Wallet = {
  wallet_id: string;
  wallet_type: string;
  address: string;
};

export const columns: ColumnDef<Wallet>[] = [
  {
    accessorKey: "wallet_id",
    header: "Wallet ID",
  },
  {
    accessorKey: "wallet_type",
    header: "Type",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const wallet = row.original;

      async function handleDelete() {
        try {
          await axios.delete(
            `https://apiv2.bhtokens.com/api/v1/remove-wallet?apikey=A20RqFwVktRxxRqrKBtmi6ud&wallet_id=` + wallet.wallet_id,
          );
          toast.success(`Address ${wallet.address} deleted successfully.`);
        } catch (error) {
          toast.error("Failed to delete wallet." + error);
        }
      }

      return (
        <Button variant="destructive" size="sm" onClick={handleDelete}>
          <Trash className="h-4 w-4" />
        </Button>
      );
    },
  },
];
