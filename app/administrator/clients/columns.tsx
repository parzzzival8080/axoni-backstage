"use client";

import { toast } from "sonner";
import { useState } from "react";
import { EditClient } from "./edit-client";
import { Assets } from "./assets";
import { Wallets } from "./wallets";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

// Define the Client type
export type Client = {
  id: string;
  uid: string;
  email: string;
  is_affiliate: string;
  is_broker: string;
  is_status: string;
  usable: string;
  status: "pending" | "processing" | "success" | "failed";
};

// Custom component to handle actions
function ClientActions({ client }: { client: Client }) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [assetsDialogOpen, setAssetsDialogOpen] = useState(false);
  const [walletDialogOpen, setWalletDialogOpen] = useState(false);
  const [freezeDialogOpen, setFreezeDialogOpen] = useState(false);

  const openEditDialog = () => setTimeout(() => setEditDialogOpen(true), 2);
  const openAssetDialog = () => setTimeout(() => setAssetsDialogOpen(true), 2);
  const openWalletDialog = () => setTimeout(() => setWalletDialogOpen(true), 2);
  const openFreezeDialog = () => setTimeout(() => setFreezeDialogOpen(true), 2);

  const isCurrentlyUsable = client.usable === "yes";
  const freezeActionLabel = isCurrentlyUsable ? "Freeze" : "Unfreeze";

  const handleFreeze = async () => {
    try {
      const response = await axios.post("/api/freeze-client", {
        uid: client.uid,
        action: isCurrentlyUsable ? "freeze" : "unfreeze",
      });

      if (response.status === 200) {
        toast.success(
          isCurrentlyUsable
            ? "Client has been frozen"
            : "Client has been unfrozen",
          {
            description: `UID: ${client.uid}`,
          }
        );
        setFreezeDialogOpen(false);
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error: any) {
      toast.error("Failed to update client status", {
        description: error?.response?.data?.message || error.message,
      });
    }
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
          <DropdownMenuItem onClick={openEditDialog}>
            Edit Client
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={openFreezeDialog}>
            {freezeActionLabel}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              toast("Client approved", {
                description: "You have successfully approved the client.",
              })
            }
          >
            Approve Client
          </DropdownMenuItem>
          <DropdownMenuItem onClick={openAssetDialog}>Assets</DropdownMenuItem>
          <DropdownMenuItem onClick={openWalletDialog}>
            Wallets
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={freezeDialogOpen} onOpenChange={setFreezeDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {freezeActionLabel} this client?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {isCurrentlyUsable
                ? "This will block the client from logging in or making transactions."
                : "This will allow the client to access their account again."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setFreezeDialogOpen(false)}>
              No
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <button onClick={handleFreeze}>Yes, {freezeActionLabel}</button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <EditClient
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        client={client}
      />

      <Assets
        open={assetsDialogOpen}
        onOpenChange={setAssetsDialogOpen}
        client={client}
      />

      <Wallets
        open={walletDialogOpen}
        onOpenChange={setWalletDialogOpen}
        client={client}
      />
    </div>
  );
}

// Define the columns
export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "uid",
    header: "UID",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "mobile_number",
    header: "Number",
  },
  {
    accessorKey: "is_affiliate",
    header: "Affiliate",
  },
  {
    accessorKey: "usable",
    header: "Account Usable",
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
    cell: ({ row }) => <ClientActions client={row.original} />,
  },
];
