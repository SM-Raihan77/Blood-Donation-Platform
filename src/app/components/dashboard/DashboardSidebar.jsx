// import { auth } from "@/lib/auth";
// import { Bars } from "@gravity-ui/icons";
// import { Button, Drawer } from "@heroui/react";
// import { ChartArea, User2 } from "lucide-react";
// import { headers } from "next/headers";
// import Link from "next/link";
// import { BiMoney } from "react-icons/bi";
// import { TbAsset } from "react-icons/tb";

// export default async function DashboardSidebar() {
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });

//   const user = session?.user;
//   const role = user?.role;
//   console.log("Logged in user:", user);

//   const dashboardItems = {
//     donor: [
//       { icon: ChartArea, label: "Overview", link: "/dashboard/donor" },
//       { icon: TbAsset, label: "My Donation Requests", link: "/dashboard/donor/my-donation-requests" },
//       { icon: BiMoney, label: "Create Donation Request", link: "/dashboard/donor/create-donation-request" },
//       { icon: BiMoney, label: "My Profile", link: "/dashboard/donor/profile" },
//     ],
//     volunteer: [
//       { icon: ChartArea, label: "Overview", link: "/dashboard/volunteer" },
//       { icon: TbAsset, label: "All Donation Requests", link: "/dashboard/volunteer/all-blood-donation-request" },
//       { icon: BiMoney, label: "Transaction", link: "/dashboard/volunteer/transaction" },
//       { icon: BiMoney, label: "My Profile", link: "/dashboard/volunteer/profile" },
//     ],
//     admin: [
//       { icon: ChartArea, label: "Overview", link: "/dashboard/admin" },
//       { icon: User2, label: "All Users", link: "/dashboard/admin/all-users" },
     
//       { icon: BiMoney, label: "Transaction", link: "/dashboard/admin/transaction" },
//       { icon: TbAsset, label: "All Blood Donation Requests", link: "/dashboard/admin/all-blood-donation-request" },
//       { icon: BiMoney, label: "My Profile", link: "/dashboard/admin/profile" },
//     ],
//   };

//   // জাভাস্ক্রিপ্টের জন্য টাইপ কাস্টিং ছাড়া সাধারণ কোড
//   const navItems = dashboardItems[role] || dashboardItems.donor;

//   return (
//     <Drawer>
//       <Button className="hidden" variant="secondary">
//         <Bars />
//         Menu
//       </Button>

//       {/* ডেস্কটপ সাইডবার */}
//       <nav className="flex flex-col gap-1 w-[200px] border-r border-default-200 min-h-screen p-2">
//         {navItems.map((item) => (
//           <Link 
//             key={item.link} 
//             href={item.link}
//             className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default-100"
//           >
//             <item.icon className="size-5 text-muted-foreground" />
//             <span>{item.label}</span>
//           </Link>
//         ))}
//       </nav>

//       {/* মোবাইল ড্রয়ার */}
//       <Drawer.Backdrop>
//         <Drawer.Content placement="left">
//           <Drawer.Dialog>
//             <Drawer.CloseTrigger />
//             <Drawer.Header>
//               <Drawer.Heading>Navigation</Drawer.Heading>
//             </Drawer.Header>
//             <Drawer.Body>
//               <nav className="flex flex-col gap-1">
//                 {navItems.map((item) => (
//                   <Link 
//                     key={item.link} 
//                     href={item.link}
//                     className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default-100"
//                   >
//                     <item.icon className="size-5 text-muted-foreground" />
//                     <span>{item.label}</span>
//                   </Link>
//                 ))}
//               </nav>
//             </Drawer.Body>
//           </Drawer.Dialog>
//         </Drawer.Content>
//       </Drawer.Backdrop>
//     </Drawer>
//   );
// }



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
  ReceiptIndianRupee, // Appropriate for transactions/history
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

  return (
    <Drawer>
      <Button className="hidden" variant="secondary">
        <Bars />
        Menu
      </Button>

      {/* Desktop Sidebar (Increased width, vertical padding, and gaps) */}
      <nav className="flex flex-col gap-2 w-[260px] border-r border-default-200 min-h-screen p-4 bg-white">
        {navItems.map((item) => (
          <Link 
            key={item.link} 
            href={item.link}
            // Text size bumped to text-base, with higher padding and crisp typography
            className="flex items-center gap-4 rounded-xl px-4 py-3 text-base font-semibold text-slate-700 transition-colors hover:bg-red-50 hover:text-red-600 group"
          >
            <item.icon className="size-5.5 text-slate-400 group-hover:text-red-600 transition-colors" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Mobile Drawer */}
      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Navigation</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              <nav className="flex flex-col gap-2 p-2">
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
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}