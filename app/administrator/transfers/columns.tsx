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
  transfer_id: string;
  uid: string;
  coin: string;
  transfer_from: string;
  transfer_to: string;
  amount: string;
  status: string;
};

// 👇 Accept a refetch callback
export const getColumns = (refetch: () => void): ColumnDef<Client>[] => [
  { accessorKey: "transfer_id", header: "Transfer ID" },
  { accessorKey: "uid", header: "UID" },
  { accessorKey: "coin", header: "Coin" },
  { accessorKey: "from", header: "From" },
  { accessorKey: "to", header: "To" },
  { accessorKey: "amount", header: "Amount" },
  { accessorKey: "status", header: "Status" },
  {
    accessorKey: "created_at",
    header: "Transaction Time",
    cell: ({ row }) => {
      const value = row.getValue("created_at");
      const date = new Date(value as string);
      return date.toLocaleString(); // Formats to something like "7/9/2025, 4:35:00 PM"
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const client = row.original;

      async function updateStatus(id: string, status: "approved" | "declined") {
        try {
          const token = localStorage.getItem("auth_token");

          await axios.put(
            "https://api.axoni.co/api/v1/update-transfer?apikey=5lPMMw7mIuyzQQDjlKJbe0dY",
            { transfer_id: id, status },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json", // optional but good practice
              },
            }
          );

          toast(`Deposit ${status}`, {
            description: `Deposit ${id} successfully ${status}.`,
          });

          refetch(); // 👈 Refresh the table
        } catch (error) {
          toast("Error", {
            description: `Failed to ${status} deposit.`,
          });
          console.error(`${status} error:`, error);
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
              onClick={() => updateStatus(client.transfer_id, "approved")}
            >
              Approve
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => updateStatus(client.transfer_id, "declined")}
            >
              Decline
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null;
    },
  },
];
