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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export type Client = {
  kyc_id: string;
  uid: string;
  username: string;
  email: string;
  captured_selfie: string;
  front_captured_image: string;
  back_captured_image: string;
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
    accessorKey: "document_type",
    header: "Document Type",
  },
  {
    accessorKey: "verification_status",
    header: "Verification Status",
  },
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
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleUpdateStatus = async (status: "approved" | "declined") => {
      try {
        const token = localStorage.getItem("auth_token");

        await axios.put(
          "https://api.fluxcoin.tech/api/v1/update-kyc?apikey=A20RqFwVktRxxRqrKBtmi6ud",
          {
            kyc_id: client.kyc_id,
            verification_status: status,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        toast("Success", {
          description: `Client ${status} for KYC.`,
        });
      } catch (error: any) {
        toast("Error", {
          description:
            error?.response?.data?.message || "Failed to update status.",
        });
        console.error("Status update error:", error);
      }
    };

    return (
      <div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              {/* Always show View Images */}
              <DropdownMenuItem onClick={() => setTimeout(() => setDialogOpen(true), 2)}>
                View Images
              </DropdownMenuItem>

              {/* Only show Approve if not already approved or declined */}
              {client.verification_status !== "approved" &&
                client.verification_status !== "declined" && (
                  <>
                    <DropdownMenuItem onClick={() => handleUpdateStatus("approved")}>
                      Approve
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleUpdateStatus("declined")}>
                      Decline
                    </DropdownMenuItem>
                  </>
                )}
            </DropdownMenuContent>
          </DropdownMenu>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>KYC Documents</DialogTitle>
              <DialogDescription>
                Review the images submitted by the client.
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              {[
                { label: "Selfie", src: client.captured_selfie },
                { label: "Front ID", src: client.front_captured_image },
                { label: "Back ID", src: client.back_captured_image },
              ].map(({ label, src }) => (
                <div key={label} className="flex flex-col items-center">
                  <a href={src} target="_blank" rel="noopener noreferrer">
                    <img
                      src={src}
                      alt={label}
                      className="rounded border w-40 h-40 object-cover hover:shadow-lg transition"
                    />
                  </a>
                  <span className="text-xs mt-2">{label}</span>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
}

];
