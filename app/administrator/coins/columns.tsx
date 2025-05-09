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
import { AddCrypto } from "./add-crypto";
import { useState } from "react";

export type Coin = {
  id: string;
  name: string;
  base_coin: string;
  symbol: string;
  price: string;
  imagePath: string;
  is_tradable: string;
  is_favorite: string;
};


export const columns: ColumnDef<Coin>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "symbol",
    header: "Symbol",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "is_tradable",
    header: "Tradable",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [dialogOpen, setDialogOpen] = useState(false);

      const coin = row.original; // full client object

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
              <DropdownMenuItem onClick={openDialogExternally}>
                Edit Coin
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
          <AddCrypto
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            coin={coin}
          />
        </div>
      );
    },
  },
];
