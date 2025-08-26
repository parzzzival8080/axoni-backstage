"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Client } from "./columns";
import { columns, Wallet } from "./wallet-columns";
import { DataTable } from "./asset-data-table";
import { Button } from "@/components/ui/button";

interface EditClientProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: Client;
}

const fetchAssets = async (uid: string): Promise<Wallet[]> => {
  try {
    const res = await fetch(
      `https://api.fluxcoin.tech/api/v1/user-addresses/${uid}?apikey=A20RqFwVktRxxRqrKBtmi6ud`
    );
    if (!res.ok) throw new Error("Failed to fetch wallets");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching wallets:", error);
    return [];
  }
};

export const Wallets = ({ open, onOpenChange, client }: EditClientProps) => {
  const [data, setData] = useState<Wallet[]>([]);
  const [loading, setLoading] = useState(true);
  const [assignTriggered, setAssignTriggered] = useState(false);

  // Load wallets on open
  useEffect(() => {
    if (open && client.uid) {
      setLoading(true);
      fetchAssets(client.uid).then((result) => {
        setData(result);
        setLoading(false);
      });
    }
  }, [open, client.uid]);

  // Trigger assign logic via useEffect
  useEffect(() => {
    if (!assignTriggered) return;

    const assignWallet = async () => {
      try {
        const res = await axios.post(
          "https://api.fluxcoin.tech/api/v1/assign-wallets/" +
            client.uid +
            "?apikey=A20RqFwVktRxxRqrKBtmi6ud"
        );
        console.log("Wallet assigned:", res.data);
        const updated = await fetchAssets(client.uid);
        setData(updated);
      } catch (error) {
        console.error("Assign failed:", error);
      } finally {
        setAssignTriggered(false); // Reset trigger
      }
    };

    assignWallet();
  }, [assignTriggered, client.uid]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-fit">
        <DialogTitle>Client Wallets</DialogTitle>
        <DialogDescription>
          <div className="overflow-x-auto">
            <Button onClick={() => setAssignTriggered(true)}>Assign</Button>
            {loading ? (
              <p className="text-muted-foreground">Loading wallets...</p>
            ) : (
              <DataTable columns={columns} data={data} />
            )}
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
