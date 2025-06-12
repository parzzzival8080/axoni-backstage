"use client";

import { toast } from "sonner";
import axios from "axios";
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

// 👇 Export a function that accepts refetch
export const getColumns = (refetch: () => void): ColumnDef<Client>[] => [
  { accessorKey: "id", header: "Transaction ID" },
  { accessorKey: "uid", header: "UID" },
  { accessorKey: "coin_name", header: "Coin" },
  { accessorKey: "txid", header: "TXID" },
  { accessorKey: "network", header: "Network" },
  { accessorKey: "initial_amount", header: "Initial Amount" },
  { accessorKey: "final_amount", header: "Final Amount" },
  { accessorKey: "fee", header: "Fee" },
  { accessorKey: "status", header: "Status" },
  {
    id: "actions",
    cell: ({ row }) => {
      const client = row.original;

      async function updateStatus(id: string, status: "approved" | "declined") {
        try {
          const token = localStorage.getItem("auth_token");

          await axios.put(
            "https://apiv2.bhtokens.com/api/v1/update-transaction?apikey=A20RqFwVktRxxRqrKBtmi6ud",
            { transaction_id: id, status },
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

          refetch(); // 👈 Refresh after action
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
              onClick={() => updateStatus(client.id, "approved")}
            >
              Approve
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => updateStatus(client.id, "declined")}
            >
              Decline
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null;
    },
  },
];
