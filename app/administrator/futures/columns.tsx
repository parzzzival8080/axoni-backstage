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

export type Client = {
  id: string;
  future_no: string;
  uid: string;
  username: string;
  coin: string;
  transaction_type: string;
  leverage: string;
  entry_price: string;
  close_approval: string;
  liquidation_price: string;
  margin: string;
  can_close: string;
  cycle: string;
  asset: string;
  income: string;
  accumulation: string;
  total_recharge: string;
  return_percentage: string;
  close_approval: string;
  amount: string;
  status: string;
  status: "pending" | "processing" | "success" | "failed" | "decline";
};

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "future_no",
    header: "Future ID",
  },
  {
    accessorKey: "uid",
    header: "UID",
  },
  {
    accessorKey: "coin",
    header: "Pair",
  },
  {
    accessorKey: "transaction_type",
    header: "Transaction Type",
  },
  {
    accessorKey: "leverage",
    header: "Leverage",
  },
  {
    accessorKey: "entry_price",
    header: "Entry Price",
  },
  {
    accessorKey: "liquidation_price",
    header: "Liquidation Price",
  },
  {
    accessorKey: "margin",
    header: "Margin",
  },
  {
    accessorKey: "cycle",
    header: "Cycle",
  },
  {
    accessorKey: "asset",
    header: "Asset",
  },
  {
    accessorKey: "income",
    header: "Income",
  },
  {
    accessorKey: "accumulation",
    header: "Accumulation",
  },
  {
    accessorKey: "total_recharge",
    header: "Total Recharge",
  },
  {
    accessorKey: "close_approval",
    header: "Close Approval",
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
            "https://apiv2.bhtokens.com/api/v1/update-transaction?apikey=A20RqFwVktRxxRqrKBtmi6ud",
            { transaction_id: id, status: "open_pos" }
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
            "https://apiv2.bhtokens.com/api/v1/update-transaction?apikey=A20RqFwVktRxxRqrKBtmi6ud",
            { transaction_id: id, status: "approved" }
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
                  variant="outline"
                  onClick={() => approveStatus(client.id)}
                >
                  Approve
                </DropdownMenuItem>
                <DropdownMenuItem
                  variant="outline"
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
