"use client";

import { toast } from "sonner";
import { useState } from "react";
import { EditClient } from "./edit-client";
import { Assets } from "./assets";

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

// Define the Client type
export type Client = {
  id: string;
  uid: string;
  email: string;
  is_affiliate: string;
  is_broker: string;
  is_status: string;
  status: "pending" | "processing" | "success" | "failed";
};

// Custom component to handle actions
function ClientActions({ client }: { client: Client }) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [assetsDialogOpen, setAssetsDialogOpen] = useState(false);
  const [selectedUid, setSelectedUid] = useState<string | null>(null); // ✅ track UID

  const openEditDialog = () => {
    setTimeout(() => setEditDialogOpen(true), 2);
  };

  const openAssetDialog = () => {
    setSelectedUid(client.uid); // ✅ store UID when opening assets
    setTimeout(() => setAssetsDialogOpen(true), 2);
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
          <DropdownMenuItem
            onClick={() =>
              toast("Successfully Saved", {
                description: "Your data has been saved",
              })
            }
          >
            Approve Client
          </DropdownMenuItem>
          <DropdownMenuItem onClick={openAssetDialog}>
            Assets
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditClient
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        client={client}
      />

      <Assets
        open={assetsDialogOpen}
        onOpenChange={setAssetsDialogOpen}
        client={client}
        uid={selectedUid} // ✅ pass the UID
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
    cell: ({ row }) => <ClientActions client={row.original} />,
  },
];
