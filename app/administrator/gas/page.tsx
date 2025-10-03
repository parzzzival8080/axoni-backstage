"use client";

import { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DataTable } from "./data-table";
import { getColumns, Client } from "./columns"; // use getColumns instead of static
import { AddGas } from "./add-gas";
import { Button } from "@/components/ui/button";

export default function DemoPage() {
  const [data, setData] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false); // dialog state

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://api.coinchi.co/api/v1/transaction-records?apikey=5lPMMw7mIuyzQQDjlKJbe0dY&transaction_type=gas"
      );
      const result: Client[] = await response.json();
      setData(result);
    } catch (error) {
      console.error("Fetch error:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = getColumns(fetchData);

  return (
    <div>
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
        Gas Fees
      </h2>
      <Breadcrumb className="m-3">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/administrator/clients">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Gas Fees</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    
      <AddGas open={open} onOpenChange={setOpen} refetch={fetchData} />

      <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
        {loading ? <p>Loading...</p> : <DataTable columns={columns} data={data} />}
      </div>
    </div>
  );
}
