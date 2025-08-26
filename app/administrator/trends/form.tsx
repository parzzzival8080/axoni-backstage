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
import { Trend } from "./columns";
import axios from "axios";
import { toast } from "sonner";
const formSchema = z.object({
  // id: z.string().min(1).max(50),
  price: z.string().min(1).max(500000000),
  percentage_threshold: z.string().min(1).max(5000000000),
  minimum_price: z.string().min(1).max(5000000000),
  maximum_price: z.string().min(1).max(5000000000),
  set_percentage: z.string().min(1).max(5000000000),
});

export function DataForm({ trend }: { trend: Trend }) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: trend.current_price,
      percentage_threshold: "0.05",
      minimum_price: trend.minimum_price,
      maximum_price: trend.maximum_price,
      set_percentage: trend.set_percentage,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const token = localStorage.getItem("auth_token");
    axios
      .put(
        "https://api.fluxcoin.tech/api/v1/set-trend?apikey=A20RqFwVktRxxRqrKBtmi6ud",
        { coin_pair_id: trend.id, ...values },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // optional but good practice
          },
        }
      )
      .then((res) => {
        toast("Trend set", {
          description: "Trend successfully set!",
        });
        console.log("set:", res.data);
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
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="percentage_threshold"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Percentage Threshold</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="minimum_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimum Price</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maximum_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maximum Price</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="set_percentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Set Percentage</FormLabel>
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
