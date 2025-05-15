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
import { Pair } from "./columns";
import { getColumns } from "./columns";

const getData = async (): Promise<Pair[]> => {
  try {
    const response = await fetch(
      "https://apiv2.bhtokens.com/api/v1/coin-pairs?apikey=A20RqFwVktRxxRqrKBtmi6ud"
    );
    if (!response.ok) throw new Error("Failed to fetch data");
    const data: Pair[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export default function DemoPage() {
  const [data, setData] = useState<Pair[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const result = await getData();
    setData([...result]); // ✅ Refreshed copy
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = getColumns(fetchData); // ✅ Hooked into refresh

  return (
    <div>
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Pairs
      </h2>
      <Breadcrumb className="m-3">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/administrator/clients">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Pairs</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
        {loading ? <p>Loading...</p> : <DataTable columns={columns} data={data} />}
      </div>
    </div>
  );
}
