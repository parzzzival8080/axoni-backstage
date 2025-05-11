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

// Import AlertDialog from ShadCN
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner"; // Assuming you're using `sonner` for toasts

export type Trend = {
  id: string;
  pair: string;
  current_price: string;
  minimum_price: string;
  maximum_price: string;
  trend_status: boolean;
  manual_status: boolean;
};

export const columns: ColumnDef<Trend>[] = [
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
      const [isTrendStatusOn, setIsTrendStatusOn] = useState(
        row.original.trend_status
      );
      const [isManualStatusOn, setIsManualStatusOn] = useState(
        row.original.manual_status
      );

      const trend = row.original;

      // State to trigger confirmation dialog
      const [confirmAction, setConfirmAction] = useState<
        "trend" | "manual" | null
      >(null);

      // Dropdown menu open state
      const [dropdownOpen, setDropdownOpen] = useState(false);

      // Toggle Trend Status (ON/OFF)
      const toggleTrendStatus = () => {
        setConfirmAction("trend");
        setDropdownOpen(false); // Close the dropdown menu before opening the alert dialog
      };

      // Toggle Manual Status (ON/OFF)
      const toggleManualStatus = () => {
        setConfirmAction("manual");
        setDropdownOpen(false); // Close the dropdown menu before opening the alert dialog
      };

      const handleConfirmToggle = () => {
        if (confirmAction === "trend") {
          setIsTrendStatusOn(!isTrendStatusOn);
          toast(`Trend Status ${isTrendStatusOn ? "OFF" : "ON"}`, {
            description: `Trend Status has been ${
              isTrendStatusOn ? "turned off" : "turned on"
            }.`,
          });
        } else if (confirmAction === "manual") {
          setIsManualStatusOn(!isManualStatusOn);
          toast(`Manual Status ${isManualStatusOn ? "OFF" : "ON"}`, {
            description: `Manual Status has been ${
              isManualStatusOn ? "turned off" : "turned on"
            }.`,
          });
        }
        setConfirmAction(null); // Reset the confirm action
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

              {/* Open Trend Dialog */}
              <DropdownMenuItem
                onClick={() => {
                  setDropdownOpen(false);
                  setDialogOpen(true);
                }}
              >
                Trend
              </DropdownMenuItem>

              {/* Toggle Trend Status */}
              <DropdownMenuItem onClick={toggleTrendStatus}>
                {isTrendStatusOn
                  ? "Set Trend Status OFF"
                  : "Set Trend Status ON"}
              </DropdownMenuItem>

              {/* Toggle Manual Status */}
              <DropdownMenuItem onClick={toggleManualStatus}>
                {isManualStatusOn
                  ? "Set Manual Status OFF"
                  : "Set Manual Status ON"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Trend Pair Dialog */}
          <TrendPair
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            trend={trend}
          />

          {/* ShadCN AlertDialog for confirmation */}
          <AlertDialog
            open={confirmAction !== null}
            onOpenChange={(open) => open || setConfirmAction(null)}
          >
            <AlertDialogContent>
              <AlertDialogHeader>Are you sure?</AlertDialogHeader>
              <AlertDialogDescription>
                Are you sure you want to change the{" "}
                {confirmAction === "trend" ? "Trend Status" : "Manual Status"}?
              </AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setConfirmAction(null)}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleConfirmToggle}
                  className="ml-3"
                >
                  Yes, I'm sure
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
