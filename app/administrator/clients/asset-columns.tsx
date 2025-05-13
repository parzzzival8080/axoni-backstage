"use client";

import { ColumnDef } from "@tanstack/react-table";


export type Asset = {
  symbol: string;
  spot: string;
  future: string;
  funding: string;
  credit: string;

};

export const columns: ColumnDef<Asset>[] = [
  {
    accessorKey: "symbol",
    header: "Symbol",
  },

  {
    accessorKey: "spot",
    header: "Spot Wallet",
  },

  {
    accessorKey: "future",
    header: "Future Wallet",
  },

  {
    accessorKey: "funding",
    header: "Funding Wallet",
  },

  {
    accessorKey: "credit",
    header: "Credit",
  },
];
