import React from "react";
import Image from "next/image";
import Link from "next/link";

const LogoTitle = () => {
  return (
    <Link href="/" className="sticky z-[80] flex items-center gap-4">
      <Image
        className="h-auto"
        src="/images/logos/ncc_100.png"
        width={18}
        height={26}
        alt="NCC Logo"
        priority
      />
      <span className="flex gap-1 font-bold tracking-wide">
        NCC | <span className="hidden sm:block">Anna University</span>
        <span className="sm:hidden">AU</span>
      </span>
    </Link>
  );
};

export default LogoTitle;
