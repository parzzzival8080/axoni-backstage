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
  order_id: string;
  uid: string;
  coin_name: string;
  order_type: string;
  execution_type: string;
  price: string;
  amount: string;
  total_in_usdt: string;
  trade_fee: string;
  status: string;
};

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "order_id",
    header: "Transaction ID",
  },
  {
    accessorKey: "uid",
    header: "UID",
  },
  {
    accessorKey: "coin_name",
    header: "Pair",
  },
  {
    accessorKey: "order_type",
    header: "Order Type",
  },

  {
    accessorKey: "execution_type",
    header: "Execution Type",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "total_in_usdt",
    header: "Total in USDT",
  },
  {
    accessorKey: "trade_fee",
    header: "Trade Fee",
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
            "https://apiv2.bhtokens.com/api/v1/update-order?apikey=A20RqFwVktRxxRqrKBtmi6ud",
            { order_id: id, status: "approved" }
          );

          toast("Order Approved", {
            description: `Order ${id} successfully approved!`,
          });
        } catch (error) {
          toast("Error", {
            description: "Failed to approve order.",
          });
          console.error("Approval error:", error);
        }
      }

      async function declineStatus(id: string) {
        try {
          const res = await axios.put(
            "https://apiv2.bhtokens.com/api/v1/update-order?apikey=A20RqFwVktRxxRqrKBtmi6ud",
            { order_id: id, status: "rejected" }
          );

          toast("Order Rejected", {
            description: `Order ${id} successfully rejected!`,
          });
        } catch (error) {
          toast("Error", {
            description: "Failed to reject order.",
          });
          console.error("Reject error:", error);
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
                  onClick={() => approveStatus(client.order_id)}
                >
                  Approve
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => declineStatus(client.order_id)}
                >
                  Reject
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      );
    },
  },
];
