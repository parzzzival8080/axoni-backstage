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
import { Client } from "./columns";
import { getColumns } from "./columns"; // 👈 changed from `columns` to `getColumns`

const getData = async (): Promise<Client[]> => {
  const token = localStorage.getItem("auth_token");

  try {
    const response = await fetch(
      "https://api.axoni.co/api/v1/fetch-conversions?apikey=5lPMMw7mIuyzQQDjlKJbe0dY",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) throw new Error("Failed to fetch data");
    const data: Client[] = await response.json();
    return data;
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

  const columns = getColumns(fetchData); // 👈 pass the refetch callback

  return (
    <div>
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Conversions
      </h2>
      <Breadcrumb className="m-3">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/administrator/clients">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Conversions</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </div>
    </div>
  );
}
