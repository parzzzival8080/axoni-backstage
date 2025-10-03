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
import { getColumns, Client } from "./columns"; // 👈 now using getColumns with fetchData

const getData = async (): Promise<Client[]> => {
  try {
    const response = await fetch(
      "https://api.coinchi.co/api/v1/transaction-records?apikey=5lPMMw7mIuyzQQDjlKJbe0dY&transaction_type=withdraw"
    );
    if (!response.ok) throw new Error("Failed to fetch data");
    const data: Client[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export default function WithdrawPage() {
  const [data, setData] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const result = await getData();
    // Add 300ms delay for smooth UI transition
    setTimeout(() => {
      setData(result);
      setLoading(false);
    }, 300);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = getColumns(fetchData); // 👈 inject refresh method

  return (
    <div>
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
        Withdraws
      </h2>
      <Breadcrumb className="m-3">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/administrator/clients">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Withdraws</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
        {loading ? <p>Loading...</p> : <DataTable columns={columns} data={data} />}
      </div>
    </div>
  );
}
