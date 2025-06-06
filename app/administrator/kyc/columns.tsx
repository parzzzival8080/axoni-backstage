"use client";

import { toast } from "sonner";
import { useState } from "react";
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
  kyc_id: string;
  uid: string;
  username: string;
  email: string;
  selfie_pic: string;
  front_id: string;
  back_id: string;
  kyc_level?: string;
  full_name?: string;
  address?: string;
  document_type?: string;
  document_number?: string;
  verification_status?: string;
};

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "kyc_id",
    header: "KYC ID",
  },
  {
    accessorKey: "uid",
    header: "UID",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "kyc_level",
    header: "Level",
  },
  {
    accessorKey: "full_name",
    header: "Full Name",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "document_type",
    header: "Document Type",
  },
  {
    accessorKey: "document_number",
    header: "Document Number",
  },
  {
    accessorKey: "verification_status",
    header: "Verification Status",
  },
 {
  id: "actions",
  cell: ({ row }) => {
    const client = row.original;
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleUpdateStatus = async (status: "approved" | "declined") => {
      try {
        await axios.put(
          `https://apiv2.bhtokens.com/api/v1/update-kyc?apikey=A20RqFwVktRxxRqrKBtmi6ud`,
          {
            kyc_id: client.kyc_id,
            verification_status: status,
          }
        );

        toast("Success", {
          description: `Client ${
            status === "approved" ? "approved" : "declined"
          } for KYC.`,
        });

        // Optionally refresh UI or re-fetch table data
      } catch (error: any) {
        toast("Error", {
          description:
            error?.response?.data?.message || "Failed to update status.",
        });
        console.error("Status update error:", error);
      }
    };

    // ✅ Don't render action menu if already approved
    if (client.verification_status === "approved") return null;

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
            <DropdownMenuItem onClick={() => handleUpdateStatus("approved")}>
              Approve
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleUpdateStatus("declined")}>
              Decline
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  },
}

];
