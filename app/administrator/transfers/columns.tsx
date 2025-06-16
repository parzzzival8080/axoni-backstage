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
    id: "actions",
    cell: ({ row }) => {
      const client = row.original;

      async function updateStatus(id: string, status: "approved" | "declined") {
        try {
          const token = localStorage.getItem("auth_token");

          await axios.put(
            "https://apiv2.bhtokens.com/api/v1/update-transfer?apikey=A20RqFwVktRxxRqrKBtmi6ud",
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
