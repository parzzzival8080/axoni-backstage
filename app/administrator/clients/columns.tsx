"use client";

import { toast } from "sonner";
import { useState } from "react";
import { EditClient } from "./edit-client";

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

export type Client = {
  id: string;
  uid: string;
  email: string;
  is_affiliate: string;
  is_broker: string;
  is_status: string;
  status: "pending" | "processing" | "success" | "failed";
};

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "uid",
    header: "UID",
  },
  {
    accessorKey: "is_affiliate",
    header: "Affiliate",
  },
  {
    accessorKey: "is_broker",
    header: "Broker",
  },
  {
    accessorKey: "is_status",
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [dialogOpen, setDialogOpen] = useState(false);

      const client = row.original; // full client object

      const openDialogExternally = () => {
        setTimeout(() => setDialogOpen(true), 2);
      };

      return (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={openDialogExternally}>
                Edit Client
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  toast("Successfully Saved", {
                    description: "Your Data has been saved",
                  })
                }
              >
                Approve Client
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <EditClient
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            client={client}
          />
        </div>
      );
    },
  },
];
