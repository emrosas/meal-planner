"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="~px-4/64 py-8 mb-8">
      <div className="flex justify-between">
        <ul className="flex gap-6 items-center text-grey">
          <li
            className={`hover:underline ${pathname === "/" ? "opacity-100" : "opacity-50 hover:opacity-80"}`}
          >
            <Link href="/">Browse</Link>
          </li>
          <li
            className={`hover:underline ${pathname === "/create" ? "opacity-100" : "opacity-50 hover:opacity-80"}`}
          >
            <Link href="/create">Create Recipe</Link>
          </li>
          <li
            className={`hover:underline ${pathname === "/plan" ? "opacity-100" : "opacity-50 hover:opacity-80"}`}
          >
            <Link href="/plan">Plan Meals</Link>
          </li>
        </ul>
        {pathname !== "/sign-in" && pathname !== "/sign-up" && (
          <>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <button
                  type="button"
                  className="bg-dark rounded-md text-white hover:bg-black hover:shadow-sm transition ease-out px-2 py-2 text-sm leading-none"
                >
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </>
        )}
      </div>
    </nav>
  );
}
