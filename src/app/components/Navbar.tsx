import Link from "next/link";
import Button from "./Button";

export default function Navbar() {
  return (
    <nav className="~px-4/64 py-8 mb-24">
      <div className="flex justify-between">
        <ul className="flex gap-6 text-grey">
          <li className="opacity-50 hover:opacity-100">
            <Link href="/">Browse</Link>
          </li>
          <li className="opacity-50 hover:opacity-100">
            <Link href="/create">Create Recipe</Link>
          </li>
          <li className="opacity-50 hover:opacity-100">
            <Link href="/plan">Plan Meals</Link>
          </li>
        </ul>
        <Button>Login</Button>
      </div>
    </nav>
  );
}
