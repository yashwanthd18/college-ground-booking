"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");

    alert("Logged Out");

    router.push("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      
      {/* Left Side */}
      <div className="flex gap-6 items-center text-xl font-semibold">
        <Link href="/">Home</Link>

        <Link href="/dashboard">
          Dashboard
        </Link>

        <Link href="/profile">
          Profile
        </Link>

        <Link href="/admin">
          Admin
        </Link>
      </div>

      {/* Right Side */}
      <div className="flex gap-4 items-center">
        <Link href="/login">
          Login
        </Link>

        <Link href="/register">
          Register
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}