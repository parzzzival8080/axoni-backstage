"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Client } from "./columns"; // ✅ Import the Client type

// ✅ Fix schema to match the form fields
const formSchema = z.object({
  uid: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().optional(), // Optional since you're editing
});

export function DataForm({ client }: { client: Client }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      uid: client.uid || "",
      email: client.email || "",
      password: "", // leave blank
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Submitted values:", values);

    // You could now send this to an API:
    // await fetch(`/api/clients/${client.id}`, { method: "PUT", body: JSON.stringify(values), headers: { "Content-Type": "application/json" } });
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
                <FormLabel>UID</FormLabel>
                <FormControl>
                  <Input placeholder="User ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Save Changes</Button>
      </form>
    </Form>
  );
}
