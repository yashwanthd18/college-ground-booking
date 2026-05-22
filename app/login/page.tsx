"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const res = await fetch(
      "http://localhost:5000/users"
    );

    const users = await res.json();

    const foundUser = users.find(
      (user: any) =>
        user.email === email &&
        user.password === password
    );

    if (!foundUser) {
      alert("Invalid Credentials");
      return;
    }

    // Save Logged In User
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(foundUser)
    );

    alert("Login Successful");

    router.push("/profile");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">
        <h1 className="text-5xl font-bold text-blue-600 text-center mb-10">
          Login
        </h1>

        <form
          onSubmit={handleLogin}
          className="space-y-6"
        >
          {/* Name */}
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full border border-gray-300 p-4 rounded-xl"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border border-gray-300 p-4 rounded-xl"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border border-gray-300 p-4 rounded-xl"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-xl text-lg font-semibold hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}