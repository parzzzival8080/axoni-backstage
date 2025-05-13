"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  uid: z.string().min(1).max(50),
  txid: z.string().min(10).max(50),
  coin_id: z.string().min(2).max(50),
  initial_amount: z.string().min(1).max(50),
  network_id: z.string().min(1).max(50),
  transaction_type: z.string().min(1).max(50),
  fee: z.string().min(1).max(50),
});

export function DataForm({ onSuccess }: { onSuccess: () => void }) {
  const [users, setUsers] = useState<{ user_id: string; uid: string }[]>([]);
  const [coins, setCoins] = useState<{ coin_id: string; name: string }[]>([]);
  const [networks, setNetworks] = useState<{ network_id: string; name: string }[]>([]);

  useEffect(() => {
    axios
      .get("https://apiv2.bhtokens.com/api/v1/user-dropdown?apikey=A20RqFwVktRxxRqrKBtmi6ud")
      .then((res) => setUsers(res.data));
    axios
      .get("https://apiv2.bhtokens.com/api/v1/coin-dropdown?apikey=A20RqFwVktRxxRqrKBtmi6ud")
      .then((res) => setCoins(res.data));
    axios
      .get("https://apiv2.bhtokens.com/api/v1/network-dropdown?apikey=A20RqFwVktRxxRqrKBtmi6ud")
      .then((res) => setNetworks(res.data));
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      uid: "",
      coin_id: "",
      txid: "",
      network_id: "",
      initial_amount: "",
      fee: "0",
      transaction_type: "credit",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    axios
      .post("https://apiv2.bhtokens.com/api/v1/transactions?apikey=A20RqFwVktRxxRqrKBtmi6ud", values)
      .then((res) => {
        toast("Credit Saved", {
          description: "Credit successfully saved!",
        });
        onSuccess?.(); // close dialog and refetch
      })
      .catch((err) => {
        toast("Error", {
          description: "Something went wrong.",
        });
        console.error("Save failed:", err);
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4 mb-2">
          <FormField
            control={form.control}
            name="uid"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Client" />
                    </SelectTrigger>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user.user_id} value={user.uid}>
                          {user.uid}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coin_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Coin</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Coins" />
                    </SelectTrigger>
                    <SelectContent>
                      {coins.map((coin) => (
                        <SelectItem key={coin.coin_id} value={coin.coin_id}>
                          {coin.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="txid"
            render={({ field }) => (
              <FormItem>
                <FormLabel>TXID</FormLabel>
                <FormControl>
                  <Input placeholder="Transaction ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="network_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Network</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Networks" />
                    </SelectTrigger>
                    <SelectContent>
                      {networks.map((network) => (
                        <SelectItem key={network.network_id} value={network.network_id}>
                          {network.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="initial_amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input placeholder="0.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
