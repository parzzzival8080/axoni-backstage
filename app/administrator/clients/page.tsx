import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Client, columns } from "./columns";
import { DataTable } from "./data-table";
import { DataForm } from "./form";




const getData = async (): Promise<Client[]> => {
  try {
    const response = await fetch(
      "https://api.kinecoin.co/api/v1/user-details?apikey=A20RqFwVktRxxRqrKBtmi6ud"
    ); // Replace with your real API URL
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data: Client[] = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Return empty array in case of error
  }
};

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="">
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Clients
      </h2>
      <Breadcrumb className="m-3">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/administrator/clients">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Clients</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
