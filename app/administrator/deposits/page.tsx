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
import { getColumns, Client } from "./columns"; // 👈 use getColumns

const getData = async (): Promise<Client[]> => {
  try {
    const response = await fetch(
      "https://api.kinecoin.co/api/v1/transaction-records?apikey=A20RqFwVktRxxRqrKBtmi6ud&transaction_type=deposit"
    );
    if (!response.ok) throw new Error("Failed to fetch data");
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export default function DemoPage() {
  const [data, setData] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const result = await getData();
    setData(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = getColumns(fetchData); // 👈 pass refresh callback

  return (
    <div>
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
        Deposits
      </h2>
      <Breadcrumb className="m-3">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/administrator/clients">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Deposits</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
        {loading ? <p>Loading...</p> : <DataTable columns={columns} data={data} />}
      </div>
    </div>
  );
}
