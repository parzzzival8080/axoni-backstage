"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { DataTable } from "./data-table";
import { columns, Asset } from "./asset-columns"; // ✅ Make sure Asset is defined here
import { Client } from "./columns"; // Still using Client for incoming props

interface EditClientProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: Client;
}

// ✅ API fetch function with correct URL and type
const getData = async (uid: string): Promise<Asset[]> => {
  try {
    const response = await fetch(
      `https://apiv2.bhtokens.com/api/v1/user-wallets/${uid}?apikey=A20RqFwVktRxxRqrKBtmi6ud`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data: Asset[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const Assets = ({ open, onOpenChange, client }: EditClientProps) => {
  const [data, setData] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open && client.uid) {
      setLoading(true);
      getData(client.uid).then((fetchedData) => {
        setData(fetchedData);
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
            <p>Loading data...</p>
          ) : (
            <DataTable columns={columns} data={data} />
          )}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
