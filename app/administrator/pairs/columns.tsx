"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { AddPair } from "./add-pair";
import { useState } from "react";

export type Pair = {
  id: string;
  pair_id: string;
  coin_id: string;
  is_tradable: string;
  is_withdrawable: string;
  is_future: string;
  deposit_limit: string;
  withdrawal_limit: string;
  withdrawal_fee: string;
  buy_limit: string;
  sell_limit: string;
  imagePath: string;
};

export const columns: ColumnDef<Pair>[] = [
  {
    accessorKey: "imagePath",
    header: "Icon",
  },
  {
    accessorKey: "base_pair",
    header: "Pair",
  },
  {
    accessorKey: "is_tradable",
    header: "Tradable",
  },
  {
    accessorKey: "is_withdrawable",
    header: "Withdrawable",
  },
  {
    accessorKey: "is_future",
    header: "Future Coin",
  },
  {
    accessorKey: "deposit_limit",
    header: "Deposit Limit",
  },
  {
    accessorKey: "withdrawal_limit",
    header: "Withdrawal Limit",
  },
  {
    accessorKey: "withdrawal_fee",
    header: "Withdrawal Fee",
  },
  {
    accessorKey: "buy_limit",
    header: "Buy Limit",
  },
  {
    accessorKey: "sell_limit",
    header: "Sell Limit",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const [dialogOpen, setDialogOpen] = useState(false);
      const pair = row.original;
      const openDialogExternally = () => {
        setTimeout(() => setDialogOpen(true), 2);
      };
      return (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={openDialogExternally}
              >
                Edit Pair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <AddPair open={dialogOpen} onOpenChange={setDialogOpen} pair={pair} />
        </div>
      );
    },
  },
];
