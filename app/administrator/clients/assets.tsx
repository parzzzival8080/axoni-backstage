"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { DataTable } from "./data-table";
import { columns } from "./asset-columns";
import { Client } from "./columns";

// ✅ API fetch function with uid parameter
const getData = async (uid: string): Promise<Client[]> => {
  try {
    const response = await fetch(
      `https://apiv2.bhtokens.com/api/v1/user-wallets/` +
        { uid } +
        `?apikey=A20RqFwVktRxxRqrKBtmi6ud&`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data: Client[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const Assets = ({ open, onOpenChange, client }: EditClientProps) => {
  const [data, setData] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open && client.uid) {
      setLoading(true); // reset loading state
      getData(client.uid).then((fetchedData) => {
        setData(fetchedData);
        setLoading(false);
      });
    }
  }, [open, client.uid]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
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
