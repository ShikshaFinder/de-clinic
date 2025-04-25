"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link
        href="/dashboard"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/dashboard" ? "text-primary" : "text-muted-foreground"
        )}
      >
        Dashboard
      </Link>
      <Link
        href="/patients"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/patients" ? "text-primary" : "text-muted-foreground"
        )}
      >
        Patients
      </Link>
      <Link
        href="/medication"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Medication
      </Link>
      <Link
        href="/nutrition"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Nutrition
      </Link>
      <Link
        href="/symptoms"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Symptoms
      </Link>
      <Link
        href="/profile"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Profile
      </Link>
    </nav>
  );
}
