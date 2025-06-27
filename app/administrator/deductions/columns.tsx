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
  id: string;
  uid: string;
  coin_name: string;
  network: string;
  txid: string;
  initial_amount: string;
  fee: string;
  final_amount: string;
  status: string;
};

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "id",
    header: "Transaction ID",
  },
  {
    accessorKey: "uid",
    header: "UID",
  },
  {
    accessorKey: "coin_name",
    header: "Coin",
  },
  {
    accessorKey: "txid",
    header: "TXID",
  },
  {
    accessorKey: "network",
    header: "Network",
  },

  {
    accessorKey: "initial_amount",
    header: "Initial Amount",
  },
  {
    accessorKey: "final_amount",
    header: "Final Amount",
  },
  {
    accessorKey: "fee",
    header: "Fee",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const client = row.original;

      async function approveStatus(id: string) {
        try {
          const res = await axios.put(
            "https://api.kinecoin.co/api/v1/update-transaction?apikey=A20RqFwVktRxxRqrKBtmi6ud",
            { transaction_id: id, status: "approved" }
          );

          toast("Deduction Approved", {
            description: `Deduction ${id} successfully approved!`,
          });
        } catch (error) {
          toast("Error", {
            description: "Failed to approve deduction.",
          });
          console.error("Approval error:", error);
        }
      }

      async function declineStatus(id: string) {
        try {
          const res = await axios.put(
            "https://api.kinecoin.co/api/v1/update-transaction?apikey=A20RqFwVktRxxRqrKBtmi6ud",
            { transaction_id: id, status: "approved" }
          );

          toast("Deduction Approved", {
            description: `Deduction ${id} successfully declined!`,
          });
        } catch (error) {
          toast("Error", {
            description: "Failed to decline deduction.",
          });
          console.error("Decline error:", error);
        }
      }
      return (
        <div>
          {client.status === "pending" && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => approveStatus(client.id)}
                >
                  Approve
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => declineStatus(client.id)}
                >
                  Decline
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      );
    },
  },
];
