"use client";

import { useState, useEffect } from "react";
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
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil } from "lucide-react";

export type Wallet = {
  id: string;
  wallet_type: string;
  address: string;
  status: string;
  assigned_to: string;
};

// ✅ Embedded EditWallet component with working handleSubmit
function EditWallet({
  wallet,
  open,
  onOpenChange,
}: {
  wallet: Wallet;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [formData, setFormData] = useState<Wallet>(wallet);

  useEffect(() => {
    setFormData(wallet);
  }, [wallet]);

  const handleChange = (field: keyof Wallet, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("auth_token");

      const response = await axios.put(
        `https://api.axoni.co/api/v1/update-wallet-address?apikey=5lPMMw7mIuyzQQDjlKJbe0dY`,
        {
          wallet_id: wallet.id,
          address: formData.address,
          assigned_to: formData.assigned_to,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Wallet updated:", response.data);
      onOpenChange(false);
    } catch (error: any) {
      console.error(
        "❌ Failed to update wallet:",
        error?.response?.data || error.message
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Wallet</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Input
            value={formData.assigned_to}
            onChange={(e) => handleChange("assigned_to", e.target.value)}
            placeholder="Assigned To"
          />
          <Input
            value={formData.address}
            onChange={(e) => handleChange("address", e.target.value)}
            placeholder="Wallet Address"
          />
        </div>

        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ✅ Actions per row
function WalletActions({ wallet }: { wallet: Wallet }) {
  const [editOpen, setEditOpen] = useState(false);
  const openEdit = () => setTimeout(() => setEditOpen(true), 2);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={openEdit}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit Wallet
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditWallet wallet={wallet} open={editOpen} onOpenChange={setEditOpen} />
    </>
  );
}

// ✅ Final column definitions
export const columns: ColumnDef<Wallet>[] = [
  {
    accessorKey: "id",
    header: "Wallet ID",
  },
  {
    accessorKey: "assigned_to",
    header: "Assigned To",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "wallet_type",
    header: "Wallet Type",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <WalletActions wallet={row.original} />,
  },
];
