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
  amount: string;
  status: string;
};

export const getColumns = (
  refreshData: () => void,
  setShowAccumulationForm: (show: boolean) => void,
  setSelectedFutureId: (id: string) => void
): ColumnDef<Client>[] => [
  { accessorKey: "future_no", header: "Future ID" },
  { accessorKey: "uid", header: "UID" },
  { accessorKey: "coin", header: "Pair" },
  { accessorKey: "transaction_type", header: "Type" },
  { accessorKey: "leverage", header: "Leverage" },
  { accessorKey: "entry_price", header: "Entry" },
  { accessorKey: "liquidation_price", header: "Liquidation" },
  { accessorKey: "margin", header: "Margin" },
  { accessorKey: "cycle", header: "Cycle" },
  { accessorKey: "remaining", header: "Remaining" },
  { accessorKey: "asset", header: "Asset" },
  { accessorKey: "asset_in_usdt", header: "Asset In USDT" },
  { accessorKey: "income", header: "Income In USDT" },
  { accessorKey: "accumulation", header: "Accumulation" },
  { accessorKey: "accumulation_in_usdt", header: "Accumulation in USDT" },
  { accessorKey: "total_recharge", header: "Recharge" },
  { accessorKey: "recharge_in_usdt", header: "Recharge In USDT" },
  { accessorKey: "close_approval", header: "Close Approval" },
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

      const handleAction = async (
        url: string,
        payload: object,
        successMessage: string,
        errorMessage: string
      ) => {
        try {
          await axios.put(url, payload);
          toast(successMessage, {
            description: `Future ${client.future_no} updated.`,
          });
          await refreshData();
        } catch (err) {
          toast("Error", { description: errorMessage });
          console.error(errorMessage, err);
        }
      };

      return (
        <div>
          {(client.status === "pending" ||
            client.status === "open_position") && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>

                {client.status === "pending" && (
                  <>
                    <DropdownMenuItem
                      onClick={() =>
                        handleAction(
                          "https://api.coinchi.co/api/v1/open-position?apikey=5lPMMw7mIuyzQQDjlKJbe0dY",
                          {
                            future_id: client.future_no,
                            status: "open_position",
                          },
                          "Open Position Approved",
                          "Failed to approve open position."
                        )
                      }
                    >
                      Approve
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        handleAction(
                          "https://api.coinchi.co/api/v1/open-position?apikey=5lPMMw7mIuyzQQDjlKJbe0dY",
                          { future_id: client.future_no, status: "declined" },
                          "Open Position Declined",
                          "Failed to decline open position."
                        )
                      }
                    >
                      Decline
                    </DropdownMenuItem>
                  </>
                )}

                {client.status === "open_position" && (
                  <>
                    <DropdownMenuItem
                      onClick={() =>
                        handleAction(
                          "https://api.coinchi.co/api/v1/close-position?apikey=5lPMMw7mIuyzQQDjlKJbe0dY",
                          { future_id: client.future_no, status: "decline" },
                          "Position Closed",
                          "Failed to close position."
                        )
                      }
                    >
                      Close Position
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        handleAction(
                          "https://api.coinchi.co/api/v1/allow-close-position?apikey=5lPMMw7mIuyzQQDjlKJbe0dY",
                          { future_id: client.future_no, status: "yes" },
                          "Close Allowed",
                          "Failed to allow close."
                        )
                      }
                    >
                      Allow Close
                    </DropdownMenuItem>

                    {/* ✅ Show Add Accumulation only for open_position */}
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedFutureId(client.future_no);
                        setShowAccumulationForm(true);
                      }}
                    >
                      Add Accumulation
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      );
    },
  },
];
