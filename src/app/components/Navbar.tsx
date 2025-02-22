import Link from "next/link";
import Button from "./Button";

export default function Navbar() {
  return (
    <nav className="~px-4/64 py-4 mb-4">
      <div className="flex justify-between">
        <ul className="flex gap-4 text-grey">
          <li className="opacity-50 hover:opacity-100">
            <Link href="/">Home</Link>
          </li>
          <li className="opacity-50 hover:opacity-100">
            <Link href="/recipes">Recipes</Link>
          </li>
          <li className="opacity-50 hover:opacity-100">
            <Link href="/plan">Plan</Link>
          </li>
        </ul>
        <Button>Login</Button>
      </div>
    </nav>
  );
}
