import React from 'react';
import { auth } from "@/lib/auth";
import { Bars } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { 
  LayoutDashboard, 
  FileSpreadsheet, 
  PlusCircle, 
  UserCircle, 
  Users, 
  ReceiptIndianRupee, 
  HeartHandshake 
} from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

export default async function DashboardSidebar() {
  // Fetch authentication session safely
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  const role = user?.role;
  console.log("Logged in user:", user);

  // Grouping menu items dynamically with accurate blood donation icons
  const dashboardItems = {
    donor: [
      { icon: LayoutDashboard, label: "Overview", link: "/dashboard/donor" },
      { icon: FileSpreadsheet, label: "My Donation Requests", link: "/dashboard/donor/my-donation-requests" },
      { icon: PlusCircle, label: "Create Donation Request", link: "/dashboard/donor/create-donation-request" },
      { icon: UserCircle, label: "My Profile", link: "/dashboard/donor/profile" },
    ],
    volunteer: [
      { icon: LayoutDashboard, label: "Overview", link: "/dashboard/volunteer" },
      { icon: HeartHandshake, label: "All Donation Requests", link: "/dashboard/volunteer/all-blood-donation-request" },
      { icon: ReceiptIndianRupee, label: "Transaction", link: "/dashboard/volunteer/transaction" },
      { icon: UserCircle, label: "My Profile", link: "/dashboard/volunteer/profile" },
    ],
    admin: [
      { icon: LayoutDashboard, label: "Overview", link: "/dashboard/admin" },
      { icon: Users, label: "All Users", link: "/dashboard/admin/all-users" },
      { icon: ReceiptIndianRupee, label: "Transaction", link: "/dashboard/admin/transaction" },
      { icon: HeartHandshake, label: "All Blood Donation Requests", link: "/dashboard/admin/all-blood-donation-request" },
      { icon: UserCircle, label: "My Profile", link: "/dashboard/admin/profile" },
    ],
  };

  // Fallback to donor items if role is not found
  const navItems = dashboardItems[role] || dashboardItems.donor;

  const navContent = (
    <nav className="flex flex-col gap-2 w-[260px] p-4 bg-white">
      {navItems.map((item) => (
        <Link 
          key={item.link} 
          href={item.link}
          className="flex items-center gap-4 rounded-xl px-4 py-3 text-base font-semibold text-slate-700 transition-colors hover:bg-red-50 hover:text-red-600 group"
        >
          <item.icon className="size-5.5 text-slate-400 group-hover:text-red-600 transition-colors" />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );

  return (
    <div>
    
      <aside className="hidden lg:block w-64 bg-white border-r border-default-200 min-h-screen sticky top-0">
        {navContent}
      </aside>

      <Drawer>
        <div className="lg:hidden p-4 bg-white border-b border-default-200 w-full flex items-center justify-between sticky top-0 z-50">
          
          <Drawer.Trigger asChild>
            <Button variant="secondary" className="flex items-center gap-2">
              <Bars />
              Menu
            </Button>
          </Drawer.Trigger>
        </div>

     

        {/* Mobile Drawer */}
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading className="text-red-600 font-bold">Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>
                {navContent}
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </div>
  );
}