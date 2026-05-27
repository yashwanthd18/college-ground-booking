"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      // Get Existing Users
      const res = await fetch(
        "https://college-ground-booking-api.onrender.com"
      );

      const users = await res.json();

      // Check Duplicate User
      const existingUser = users.find(
        (user: any) => user.email === email
      );

      if (existingUser) {
        alert("User already exists");
        return;
      }

      // New User
      const newUser = {
        name,
        email,
        password,
      };

      // Save User
      await fetch(
        "https://college-ground-booking-api.onrender.com",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );

      alert("Registration Successful");

      router.push("/login");
    } catch (error) {
      console.log(error);

      alert("Server Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">
        <h1 className="text-5xl font-bold text-green-600 text-center mb-10">
          Sign Up
        </h1>

        <form
          onSubmit={handleRegister}
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
            className="w-full border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-lg font-semibold transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}