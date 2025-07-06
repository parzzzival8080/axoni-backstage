"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

type AddAccumulationFormProps = {
  futureId: string;
  onSuccess: () => void;
};

export default function AddAccumulationForm({
  futureId,
  onSuccess,
}: AddAccumulationFormProps) {
  const [amount, setAmount] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("auth_token");

      await axios.put(
        "https://api.kinecoin.co/api/v1/update-accumulation?apikey=A20RqFwVktRxxRqrKBtmi6ud",
        {
          future_id: futureId,
          accumulation: amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // optional but good practice
          },
        }
      );
      toast("Accumulation Added", {
        description: `Future ${futureId} updated.`,
      });
      onSuccess();
    } catch (err) {
      console.error(err);
      toast("Error", {
        description: "Failed to add accumulation.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-muted border rounded-lg p-6 w-full max-w-sm shadow-md space-y-4"
      >
        <h3 className="text-lg font-semibold">
          Add Accumulation for #{futureId}
        </h3>

        <Input
          type="number"
          placeholder="Enter percentage "
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onSuccess}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading || !amount}>
            {loading ? "Saving..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
}
