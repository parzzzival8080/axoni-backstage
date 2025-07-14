"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeftRight,
  BanknoteArrowDown,
  BanknoteArrowUp,
  Bitcoin,
  CandlestickChart,
  ChevronUp,
  CircleDollarSign,
  Coins,
  CreditCard,
  Fuel,
  Key,
  Lock,
  Send,
  Settings,
  Settings2,
  UserMinus,
  Users,
  Wallet,
} from "lucide-react";

import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "./ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const clients = [
  { title: "Clients", url: "/administrator/clients", icon: Users },
  { title: "KYC", url: "/administrator/kyc", icon: Lock },
  { title: "Deposits", url: "/administrator/deposits", icon: BanknoteArrowUp },
  {
    title: "Withdraws",
    url: "/administrator/withdraws",
    icon: BanknoteArrowDown,
  },
  { title: "Credits", url: "/administrator/credits", icon: CreditCard },
  { title: "Deductions", url: "/administrator/deductions", icon: UserMinus },
  { title: "Gas", url: "/administrator/gas", icon: Fuel },
  { title: "Verifications", url: "/administrator/verifications", icon: Send },
];

const trading = [
  { title: "Spot", url: "/administrator/spot", icon: CandlestickChart },
    { title: "conversions", url: "/administrator/conversions", icon: CircleDollarSign },
  { title: "Transfers", url: "/administrator/transfers", icon: ArrowLeftRight },
  { title: "Futures", url: "/administrator/futures", icon: CircleDollarSign },
];

const cryptocurrency = [
  { title: "Coins", url: "/administrator/coins", icon: Bitcoin },
  { title: "Pairs", url: "/administrator/pairs", icon: Coins },
  { title: "Trends", url: "/administrator/trends", icon: CandlestickChart },
];

const AppSidebar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth_token"); // 👈 match key
    setIsLoggedIn(!!token);
  }, []);

  if (!isLoggedIn) return null; // 🔒 Hide sidebar if not logged in

  return (
    <Sidebar collapsible="icon" side="left">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="#">
                <Settings /> My Backstage
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Client Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {clients.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Trading</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {trading.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Cryptocurrency</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {cryptocurrency.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <Settings2 /> Platform Settings{" "}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Wallet />
                  Crypto Wallets
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Key />
                  Api Keys
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
