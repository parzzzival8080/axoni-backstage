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
import { AddPair } from "./add-pair";
import { useState } from "react";

export type Pair = {
  coin_pair_id: string;
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

const ActionsMenu = ({
  pair,
  fetchData,
}: {
  pair: Pair;
  fetchData: () => void;
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const openEditDialog = () => {
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
          <DropdownMenuItem onClick={openEditDialog}>Edit Pair</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AddPair
        open={dialogOpen}
        onOpenChange={(isOpen) => {
          setDialogOpen(isOpen);
          if (!isOpen) fetchData();
        }}
        pair={pair}
        onSuccess={() => {
          setDialogOpen(false);
          fetchData();
        }}
      />
    </div>
  );
};

export const getColumns = (fetchData: () => void): ColumnDef<Pair>[] => [
  {
    accessorKey: "id",
    header: "Pair ID",
  },
  {
  accessorKey: "imagePath",
  header: "Icon",
  cell: ({ row }) => {
    const src = row.original.imagePath?.replace(/([^:]\/)\/+/g, "$1"); // sanitize slashes
    return (
      <div className="flex justify-center items-center">
        {src ? (
          <a href={src} target="_blank" rel="noopener noreferrer">
            <img
              src={src}
              alt="icon"
              width={32}
              height={32}
              className="rounded-full w-8 h-8 object-cover border border-gray-200 shadow-sm hover:scale-105 transition-transform"
            />
          </a>
        ) : (
          <span className="text-xs text-gray-400">No Icon</span>
        )}
      </div>
    );
  },
},
  {
    accessorKey: "pair",
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
    cell: ({ row }) => (
      <ActionsMenu pair={row.original} fetchData={fetchData} />
    ),
  },
];
