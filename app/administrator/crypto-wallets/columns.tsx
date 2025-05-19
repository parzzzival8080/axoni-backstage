"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
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
import { AddWallet } from "./add-wallet";

export type Wallet = {
  id: string;
  wallet_type: string;
  address: string;
  status: string;
  assigned_to: string;
};

export const columns: ColumnDef<Wallet>[] = [
  {
    accessorKey: "wallet_type",
    header: "Wallet Type",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "assigned_to",
    header: "Assigned To",
  },
];
