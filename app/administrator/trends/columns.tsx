"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
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
import { TrendPair } from "./trend-pair";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import axios from "axios";

export type Trend = {
  id: string;
  pair: string;
  current_price: string;
  minimum_price: string;
  maximum_price: string;
  trend_status: boolean;
  manual_status: boolean;
};

export const columns = (fetchData: () => void): ColumnDef<Trend>[] => [
  {
    accessorKey: "id",
    header: "Pair ID",
  },
  {
    accessorKey: "pair",
    header: "Pair",
  },
  {
    accessorKey: "current_price",
    header: "Current Price",
  },
  {
    accessorKey: "minimum_price",
    header: "Minimum Price",
  },
  {
    accessorKey: "maximum_price",
    header: "Maximum Price",
  },
  {
    accessorKey: "trend_status",
    header: "Trend Status",
  },
  {
    accessorKey: "manual_status",
    header: "Manual Status",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [dialogOpen, setDialogOpen] = useState(false);
      const [confirmAction, setConfirmAction] = useState<
        "trend" | "manual" | null
      >(null);
      const [dropdownOpen, setDropdownOpen] = useState(false);

      const trends = row.original;

      const handleConfirmToggle = async () => {
        try {
          if (confirmAction === "trend") {
            await axios.put(
              "https://apiv2.bhtokens.com/api/v1/update-trend-status?apikey=A20RqFwVktRxxRqrKBtmi6ud",
              {
                trend_status: !trends.trend_status ? "on" : "off",
                coin_pair_id: trends.id,
              }
            );
            toast.success("Trend Status has been toggled.");
          } else if (confirmAction === "manual") {
            await axios.put(
              "https://apiv2.bhtokens.com/api/v1/update-manual-status?apikey=A20RqFwVktRxxRqrKBtmi6ud",
              {
                manual_status: !trends.manual_status ? "on" : "off",
                coin_pair_id: trends.id,
              }
            );
            toast.success("Manual Status has been toggled.");
          }

          fetchData(); // ✅ Refetch after action
        } catch (error) {
          toast.error("Failed to update status");
          console.error(error);
        } finally {
          setConfirmAction(null);
        }
      };

      return (
        <div>
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setDropdownOpen(false);
                  setDialogOpen(true);
                }}
              >
                Trend
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setDropdownOpen(false);
                  setConfirmAction("trend");
                }}
              >
                Toggle Trend Status
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setDropdownOpen(false);
                  setConfirmAction("manual");
                }}
              >
                Toggle Manual Status
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <TrendPair
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            trend={trends}
          />

          <AlertDialog
            open={!!confirmAction}
            onOpenChange={(open) => open || setConfirmAction(null)}
          >
            <AlertDialogContent>
              <AlertDialogHeader>Are you sure?</AlertDialogHeader>
              <AlertDialogDescription>
                Change{" "}
                {confirmAction === "trend" ? "Trend Status" : "Manual Status"}?
              </AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirmToggle}>
                  Yes, confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
