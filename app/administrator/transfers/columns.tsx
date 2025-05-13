"use client";

import { toast } from "sonner";
import { useState } from "react";

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
import axios from "axios";

export type Client = {
  id: string;
  uid: string;
  coin: string;
  transfer_from: string;
  transfer_to: string;
  amount: string;
  status: string;
};

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "id",
    header: "Transfer ID",
  },
  {
    accessorKey: "uid",
    header: "UID",
  },
  {
    accessorKey: "coin",
    header: "Coin",
  },
  {
    accessorKey: "from",
    header: "From",
  },
  {
    accessorKey: "to",
    header: "To",
  },
   {
    accessorKey: "amount",
    header: "Amount",
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
            "https://apiv2.bhtokens.com/api/v1/update-transfer?apikey=A20RqFwVktRxxRqrKBtmi6ud",
            { transfer_id: id, status: "approved" }
          );

          toast("Deposit Approved", {
            description: `Deposit ${id} successfully approved!`,
          });
        } catch (error) {
          toast("Error", {
            description: "Failed to approve deposit.",
          });
          console.error("Approval error:", error);
        }
      }

      async function declineStatus(id: string) {
        try {
          const res = await axios.put(
            "https://apiv2.bhtokens.com/api/v1/update-transfer?apikey=A20RqFwVktRxxRqrKBtmi6ud",
            { transfer_id: id, status: "approved" }
          );

          toast("Deposit Approved", {
            description: `Deposit ${id} successfully declined!`,
          });
        } catch (error) {
          toast("Error", {
            description: "Failed to decline deposit.",
          });
          console.error("Approval error:", error);
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
