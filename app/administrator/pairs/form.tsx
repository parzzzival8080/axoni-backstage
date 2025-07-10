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
import { toast } from "sonner";
const formSchema = z.object({
  buy_limit: z.string().min(1).max(50),
  sell_limit: z.string().min(1).max(50),
});

export function DataForm({ pair, onSuccess }: { pair: Pair; onSuccess?: () => void }) {
  const [coins, setCoins] = useState<{ coin_id: string; name: string }[]>([]);

  useEffect(() => {
    axios
      .get("https://api.kinecoin.co/api/v1/coin-dropdown?apikey=A20RqFwVktRxxRqrKBtmi6ud")
      .then((res) => setCoins(res.data));
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      buy_limit: pair.buy_limit || "",
      sell_limit: pair.sell_limit || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = pair.pair
        ? `https://api.kinecoin.co/api/v1/coin-pairs/${pair.pair}?apikey=A20RqFwVktRxxRqrKBtmi6ud`
        : `https://api.kinecoin.co/api/v1/coin-pairs?apikey=A20RqFwVktRxxRqrKBtmi6ud`;

      const method = pair.pair ? axios.put : axios.post;

      await method(url, values);

      toast(pair.pair ? "Successfully Updated" : "Pair Saved", {
        description: "Pair successfully saved!",
      });

      if (onSuccess) onSuccess(); // 🔄 Trigger refetch
    } catch (error) {
      console.error("Error saving data:", error);
      toast("Error", { description: "Something went wrong." });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4 mb-2">
          <FormField
            control={form.control}
            name="buy_limit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Buy Limit</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                  <Input {...field} />
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

