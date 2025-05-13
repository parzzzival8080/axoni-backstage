"use client";

import { toast } from "sonner";
import { useState } from "react";
import axios from "axios";

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export type Client = {
  uid: string;
  spot_wallet: string;
  future_wallet: string;
  funding_wallet: string;
  credit: string;
};

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "uid",
    header: "UID",
  },
  {
    accessorKey: "spot_wallet",
    header: "Spot",
  },
  {
    accessorKey: "future_wallet",
    header: "Future",
  },
  {
    accessorKey: "funding_wallet",
    header: "Funding",
  },

  {
    accessorKey: "credit",
    header: "Credit",
  },
];
