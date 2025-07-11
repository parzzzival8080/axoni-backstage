"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wallet } from "./columns";

type EditWalletProps = {
  wallet: Wallet;
  onClose: () => void;
};

export const EditWallet = ({ wallet, onClose }: EditWalletProps) => {
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
      `https://api.kinecoin.co/api/v1/wallet-addresses/${wallet.id}?apikey=A20RqFwVktRxxRqrKBtmi6ud`,
      {
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
    onClose();
  } catch (error: any) {
    console.error("❌ Failed to update wallet:", error?.response?.data || error.message);
  }
};

  return (
    <Dialog open onOpenChange={onClose}>
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
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
