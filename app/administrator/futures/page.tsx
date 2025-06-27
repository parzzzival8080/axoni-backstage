"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getColumns, Client } from "./columns"; // Make sure `getColumns(getData)` is correct
import { DataTable } from "./data-table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function DemoPage() {
  const [data, setData] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("https://api.kinecoin.co/api/v1/futures?apikey=A20RqFwVktRxxRqrKBtmi6ud");
      const result = await res.json();
      setData(result); // ✅ This updates table data
    } catch (err) {
      toast("Error loading data");
      console.error("Failed to fetch futures:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = getColumns(getData); // ✅ Pass refresh function here

  return (
    <div>
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
        Futures
      </h2>

      <Breadcrumb className="m-3">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/administrator/clients">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Futures</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
        {isLoading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </div>
    </div>
  );
}
