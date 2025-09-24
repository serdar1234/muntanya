"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <header className="header">
      <Link href="/">
        <Image src="/logo.png" alt="Logo" width={60} height={60} />
      </Link>
    </header>
  );
};

export default memo(Logo);
