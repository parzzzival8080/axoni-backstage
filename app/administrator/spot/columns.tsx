// columns.tsx
"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
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

// 👉 `getColumns` receives a `refetch` function
export const getColumns = (refetch: () => void): ColumnDef<Client>[] => [
  { accessorKey: "order_id", header: "Transaction ID" },
  { accessorKey: "uid", header: "UID" },
  { accessorKey: "coin_name", header: "Pair" },
  { accessorKey: "order_type", header: "Order Type" },
  { accessorKey: "execution_type", header: "Execution Type" },
  { accessorKey: "price", header: "Price" },
  { accessorKey: "amount", header: "Amount" },
  { accessorKey: "total_in_usdt", header: "Total in USDT" },
  { accessorKey: "trade_fee", header: "Trade Fee" },
  { accessorKey: "status", header: "Status" },
  {
    id: "actions",
    cell: ({ row }) => {
      const client = row.original;

      async function updateStatus(id: string, status: "approved" | "rejected") {
        try {
          const token = localStorage.getItem("auth_token");

          await axios.put(
            "https://apiv2.bhtokens.com/api/v1/update-order?apikey=A20RqFwVktRxxRqrKBtmi6ud",
            { order_id: id, status },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json", // optional but good practice
              },
            }
          );
          toast(`Order ${status}`, {
            description: `Order ${id} successfully ${status}!`,
          });
          refetch(); // ✅ Refresh data after update
        } catch (error) {
          toast("Error", {
            description: `Failed to ${status} order.`,
          });
        }
      }

      return client.status === "pending" ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => updateStatus(client.order_id, "approved")}
            >
              Approve
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => updateStatus(client.order_id, "rejected")}
            >
              Reject
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null;
    },
  },
];
