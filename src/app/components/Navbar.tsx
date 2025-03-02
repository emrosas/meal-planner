"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="~px-4/64 py-8 mb-24">
      <div className="flex justify-between">
        <ul className="flex gap-6 items-center text-grey">
          <li>
            <Link href="/">
              <FireSVG />
            </Link>
          </li>
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

const FireSVG = () => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.375 3L14.187 3.781C13.887 5.129 11.953 7.348 9.969 10.062C7.984 12.777 6 16.16 6 20.407C6 22.411 6.613 24.552 8.125 26.22C9.637 27.887 12.047 29 15.313 29C15.457 29 15.578 28.973 15.719 28.969C15.813 28.973 15.902 29 16 29C16.305 29 16.59 28.965 16.875 28.937C16.961 28.93 17.039 28.914 17.125 28.907C20.473 28.629 22.695 27.597 24.063 26.062C25.668 24.262 26 21.977 26 20C26 15.535 23.43 11.383 20.937 8.312C18.444 5.241 15.937 3.219 15.937 3.219L15.658 3H14.375ZM15.5 5.5C16.309 6.21 17.672 7.496 19.375 9.594C21.727 12.492 24 16.332 24 20C24 21.754 23.691 23.453 22.562 24.719C22.3007 25.0115 22.0072 25.2735 21.687 25.5C22.227 23.941 22.109 22.168 21.75 20.406C21.34 18.395 20.562 16.375 19.812 14.75C19.062 13.125 18.422 11.977 17.875 11.344L17.594 11H15.656L16.031 12.281C17.078 15.684 16.527 18 15.938 18.687C15.645 19.031 15.516 19.062 15.218 18.969C14.922 18.875 14.387 18.489 13.875 17.531L13.125 16.125L12.187 17.406C10.317 19.926 9.597 22.688 10.219 25C10.273 25.203 10.359 25.402 10.438 25.594C10.1458 25.3794 9.87372 25.1387 9.625 24.875C8.508 23.645 8 22 8 20.406C8 16.786 9.703 13.836 11.594 11.25C13.133 9.145 14.633 7.367 15.5 5.5ZM18.563 17.219C19.027 18.395 19.531 19.582 19.781 20.812C20.145 22.602 20.137 24.238 19.625 25.282C19.242 26.062 18.648 26.637 17.437 26.875C17.305 26.902 17.148 26.918 17 26.938C16.687 26.965 16.344 26.988 16 27C15.91 27 15.836 27.004 15.75 27C13.586 26.93 12.547 25.965 12.156 24.5C11.832 23.293 12.254 21.61 13.156 19.906C13.602 20.367 14.074 20.703 14.625 20.875C15.645 21.195 16.781 20.805 17.469 20C18.059 19.309 18.407 18.352 18.563 17.219Z"
        fill="#1E1E1E"
      />
    </svg>
  );
};
