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
import { getColumns, Client } from "./columns";
import { AddCredit } from "./add-credit";
import { Button } from "@/components/ui/button";

export default function DemoPage() {
  const [data, setData] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://apiv2.bhtokens.com/api/v1/transaction-records?apikey=A20RqFwVktRxxRqrKBtmi6ud&transaction_type=credit"
      );
      const result: Client[] = await res.json();
      setData(result);
    } catch (error) {
      console.error("Failed to fetch credit data:", error);
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
    <div className="">
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
        Credits
      </h2>
      <Breadcrumb className="m-3">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/administrator/clients">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Credits</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <AddCredit open={open} onOpenChange={setOpen} refetch={fetchData} />

      <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
        {loading ? <p>Loading...</p> : <DataTable columns={columns} data={data} />}
      </div>
    </div>
  );
}
