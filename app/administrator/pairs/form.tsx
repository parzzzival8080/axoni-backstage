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
import { Pair } from "./columns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import { useEffect, useState } from "react";
const formSchema = z.object({
  id: z.string().min(1).max(50),
  coin_id: z.string().min(1).max(50),
  base_pair: z.string().min(1).max(50),
  is_tradable: z.string().min(1).max(50),
  is_withdrawable: z.string().min(1).max(50),
  is_future: z.string().min(1).max(50),
  deposit_limit: z.string().min(1).max(50),
  withdrawal_limit: z.string().min(1).max(50),
  withdrawal_fee: z.string().min(1).max(50),
  buy_limit: z.string().min(1).max(50),
  sell_limit: z.string().min(1).max(50),
  imagePath: z.string().min(1).max(50),
});

export function DataForm({ pair }: { pair: Pair }) {
  // 1. Define your form.
  const [coins, setCoins] = useState<{ id: string; label: string }[]>([]);

  useEffect(() => {
    axios
      .get(
        "https://apiv2.bhtokens.com/api/v1/coin-dropdown?apikey=A20RqFwVktRxxRqrKBtmi6ud"
      )
      .then((res) => setCoins(res.data));
  }, []);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: pair.id || "",
      coin_id: pair.coin_id || "",
      pair_id: pair.pair_id || "",
      is_tradable: pair.is_tradable || "",
      is_withdrawable: pair.is_withdrawable || "",
      is_future: pair.is_future || "",
      deposit_limit: pair.deposit_limit || "",
      withdrawal_limit: pair.withdrawal_limit || "",
      withdrawal_fee: pair.withdrawal_fee || "",
      buy_limit: pair.buy_limit || "",
      sell_limit: pair.sell_limit || "",
      imagePath: pair.imagePath || "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4 mb-2">
          <FormField
            control={form.control}
            name="coin_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Coin</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Coins" />
                      </SelectTrigger>
                    </FormControl>
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
            name="pair_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pair</FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Pair" {...field} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">USDT</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pair_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pair Type</FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Pair Type" {...field} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">ALT</SelectItem>
                      <SelectItem value="dark">ETH</SelectItem>
                      <SelectItem value="system">POW</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="deposit_limit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deposit Limit</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="withdrawal_limit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Withdrawal Limit</FormLabel>
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
            name="buy_limit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Buy Limit</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sell_limit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sell Limit</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="is_withdrawable"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Withdrawable</FormLabel>
                <FormControl>
                  <Switch />
                </FormControl>
                <FormDescription>
                  Turn on or off if crypto is withdrawable
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="is_future"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Future Coin</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>
                  Turn on or off if coin can be used for futures
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pair_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tradable</FormLabel>
                <FormControl>
                  <Switch />
                </FormControl>
                <FormDescription>
                  Turn on or off if crypto is tradable
                </FormDescription>
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
