"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Client } from "./columns";
import { columns, Asset } from "./asset-columns";
import { DataTable } from "./asset-data-table";

interface EditClientProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: Client;
}


const fetchAssets = async (uid: string): Promise<Asset[]> => {
  try {
    const res = await fetch(
      `https://api.fluxcoin.tech/api/v1/user-assets/${uid}?apikey=A20RqFwVktRxxRqrKBtmi6ud`
    );
    if (!res.ok) throw new Error("Failed to fetch assets");
    const data = await res.json();
    console.log(data)
    return data; // No mapping or parsing
  } catch (error) {
    console.error("Error fetching assets:", error);
    return [];
  }
};

export const Assets = ({ open, onOpenChange, client }: EditClientProps) => {
  const [data, setData] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open && client.uid) {
      setLoading(true);
      fetchAssets(client.uid).then((result) => {
        setData(result);
        setLoading(false);
      });
    }
  }, [open, client.uid]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[800px]">
        <DialogTitle>Client Assets</DialogTitle>
        <DialogDescription>
          {loading ? (
            <p className="text-muted-foreground">Loading assets...</p>
          ) : (
            <DataTable columns={columns} data={data} />
          )}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
