"use client";

import { useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Trend, columns as getColumns } from "./columns";
import { DataTable } from "./data-table";
import { toast } from "sonner";

export default function DemoPage() {
  const [data, setData] = useState<Trend[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.coinchi.co/api/v1/trends?apikey=5lPMMw7mIuyzQQDjlKJbe0dY");
      if (!response.ok) throw new Error("Failed to fetch data");
      const trends: Trend[] = await response.json();
      setData(trends);
    } catch (err) {
      console.error(err);
      toast.error("Error fetching trends");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = getColumns(fetchData); // 👈 inject fetchData into columns

  return (
    <div>
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
        Trends
      </h2>
      <Breadcrumb className="m-3">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/administrator/clients">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Trends</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
        <DataTable columns={columns} data={data} loading={loading} />
      </div>
    </div>
  );
}
