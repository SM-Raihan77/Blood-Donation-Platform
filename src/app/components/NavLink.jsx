"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, className = "", children }) => {
  const pathname = usePathname();

  const isActive = pathname === href;

  // console.log({
  //   href,
  //   pathname,
  //   isActive,
  // });

  return (
    <Link
      href={href}
      className={`${className} ${
        isActive ? "border-b-2 border-red-500 text-red-500" : ""
      }`}
    >
      {children}
    </Link>
  );
};

export default NavLink;