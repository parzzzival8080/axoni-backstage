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

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

// Define the Client type
// ...imports

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
  const [levelDialogOpen, setLevelDialogOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<string>("");

  const openEditDialog = () => setTimeout(() => setEditDialogOpen(true), 2);
  const openAssetDialog = () => setTimeout(() => setAssetsDialogOpen(true), 2);
  const openWalletDialog = () => setTimeout(() => setWalletDialogOpen(true), 2);
  const openFreezeDialog = () => setTimeout(() => setFreezeDialogOpen(true), 2);
  const openLevelDialog = () => setTimeout(() => setLevelDialogOpen(true), 2);

  const isFrozen = client.usable !== "yes";
  const freezeActionLabel = isFrozen ? "Unfreeze Account" : "Freeze Account";

  const handleFreeze = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      await axios.put(
        "https://api.kinecoin.co/api/v1/freeze-account?apikey=A20RqFwVktRxxRqrKBtmi6ud",
        {
          uid: client.uid,
          action: isFrozen ? "unfreeze" : "freeze",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(
        isFrozen ? "Client has been unfrozen" : "Client has been frozen",
        { description: `UID: ${client.uid}` }
      );
      setFreezeDialogOpen(false);
    } catch (error: any) {
      toast.error("Failed to update client status", {
        description: error?.response?.data?.message || error.message,
      });
    }
  };

  const handleLevelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("auth_token");
      const res = await axios.put(
        "https://api.kinecoin.co/api/v1/update-level?apikey=A20RqFwVktRxxRqrKBtmi6ud",
        {
          uid: client.uid,
          level: selectedLevel,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        toast("Level Updated", {
          description: `Client UID: ${client.uid} set to level ${selectedLevel}`,
        });
        setLevelDialogOpen(false);
      } else {
        throw new Error("Unexpected server response");
      }
    } catch (error: any) {
      toast.error("Failed to update level", {
        description: error?.response?.data?.message || error.message,
      });
    }
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
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
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={openLevelDialog}>
            Set Level
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 🔐 Freeze Alert Dialog */}
      <AlertDialog open={freezeDialogOpen} onOpenChange={setFreezeDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {freezeActionLabel} this client?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {isFrozen
                ? "This will allow the client to access their account again."
                : "This will block the client from logging in or making transactions."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No</AlertDialogCancel>
            <AlertDialogAction asChild>
              <button onClick={handleFreeze}>Yes, {freezeActionLabel}</button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ✅ Level Dialog */}
      <Dialog open={levelDialogOpen} onOpenChange={setLevelDialogOpen}>
        <DialogContent>
          <form onSubmit={handleLevelSubmit}>
            <DialogHeader>
              <DialogTitle>Set Client Level</DialogTitle>
              <DialogDescription>
                Choose a level from 0 to 10 to assign to this client.
              </DialogDescription>
            </DialogHeader>
            <div className="my-4">
              <Select
                value={selectedLevel}
                onValueChange={(value) => setSelectedLevel(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 11 }, (_, i) => (
                    <SelectItem key={i} value={i.toString()}>
                      Level {i}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Other Dialogs */}
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
    accessorKey: "phone_number",
    header: "Number",
  },
  {
    accessorKey: "user_country",
    header: "Country",
  },
  {
    accessorKey: "ip_address",
    header: "IP Address",
  },
  {
    accessorKey: "usable",
    header: "Account Usable",
  },
  {
    accessorKey: "is_status",
    header: "Status",
  },
  {
    accessorKey: "created_at",
    header: "Register Time",
    cell: ({ row }) => {
      const value = row.getValue("created_at");
      const date = new Date(value as string);
      return date.toLocaleString(); // Formats to something like "7/9/2025, 4:35:00 PM"
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ClientActions client={row.original} />,
  },
];
