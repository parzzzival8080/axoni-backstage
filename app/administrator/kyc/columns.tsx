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
  uid: string;
  username: string;
  email: string;
  selfie_pic: string;
  front_id: string;
  back_id: string;
};

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "uid",
    header: "UID",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "selfie_pic",
    header: "Selfie",
  },
  {
    accessorKey: "front_id",
    header: "Front ID",
  },
  {
    accessorKey: "back_id",
    header: "Back ID",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [dialogOpen, setDialogOpen] = useState(false);

      function openDialogExternally() {
        setTimeout(() => setDialogOpen(true), 2);
      }
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
              {/* <DropdownMenuItem onClick={openDialogExternally}>
                Edit Client
              </DropdownMenuItem>
              <DropdownMenuSeparator /> */}
              <DropdownMenuItem
                variant="outline"
                onClick={() =>
                  toast("Approved", {
                    description: "Client Approved for KYC",
                  })
                }
              >
                Approve
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="outline"
                onClick={() =>
                  toast("Successfully Saved", {
                    description: "Client Decline for KYC",
                  })
                }
              >
                Decline
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
