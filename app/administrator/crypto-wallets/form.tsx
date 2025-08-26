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
  wallet_type_id: z.string().min(1).max(50),
  address: z.string().min(8).max(50),
});

export function DataForm() {
    const [networks, setNetworks] = useState<{ network_id: string; symbol: string }[]>([]);
  
    useEffect(() => {
        axios.get("https://api.fluxcoin.tech/api/v1/type-dropdown?apikey=A20RqFwVktRxxRqrKBtmi6ud")
          .then((res) => setNetworks(res.data));
      }, []);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      wallet_type_id: "",
      address: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
   axios
      .post("https://api.fluxcoin.tech/api/v1/wallet-addresses?apikey=A20RqFwVktRxxRqrKBtmi6ud", values)
      .then((res) => {
        console.log(res.data.message)
        toast("Prompt", {
          description: res.data.message,
        });
        form.reset();      // ✅ Clear the form
        // onSuccess();       // ✅ Trigger refetch and dialog close
      })
      .catch((err) => {
        toast("Error", {
          description: "Something went wrong.",
        });
        console.error("Save failed:", err);
      });
  };
    // console.log(values);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4 mb-2">

           <FormField
            control={form.control}
            name="wallet_type_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Network</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Networks" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {networks.map((network) => (
                        <SelectItem
                          key={network.network_id}
                          value={network.network_id}
                        >
                          {network.symbol}
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
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input  placeholder="" {...field} />
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
