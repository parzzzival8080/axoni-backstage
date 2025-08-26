"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Coin } from "./columns";
import axios from "axios";
import { toast } from "sonner";
const formSchema = z.object({
  name: z.string().min(2).max(50),
  base_coin: z.string().min(2).max(50),
  symbol: z.string().min(2).max(50),
  withdrawal_min_limit: z.string().min(2).max(50),
  withdrawal_fee: z.string().min(1).max(50),
  image_path: z.string().min(1).max(50),
});

export function DataForm({ coin }: { coin: Coin }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: coin.name || "",
      base_coin: coin.base_coin || "",
      symbol: coin.symbol || "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    axios
      .post(
        "https://api.fluxcoin.tech/api/v1/coins?apikey=A20RqFwVktRxxRqrKBtmi6ud",
        values
      )
      .then((res) => {
        toast("Cryptocurrency Saved", {
          description: "Cryptocurrency successfully saved!",
        });
        console.log("Saved:", res.data);
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Crypto Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="base_coin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Base Crypto</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="symbol"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Symbol</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

<FormField
            control={form.control}
            name="withdrawal_min_limit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimum Withdrawal</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="withdrawal_fee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Withdrawal Fee</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image_path"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image Path</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
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
