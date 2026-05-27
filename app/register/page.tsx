"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSubmit = async (
    e: any
  ) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://college-ground-booking-api.onrender.com/users",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Signup failed"
        );
      }

      const data =
        await response.json();

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(data)
      );

      alert(
        "Signup Successful"
      );

      router.push("/profile");
    } catch (error) {
      console.log(error);

      alert("Server Error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-xl"
      >
        <h1 className="text-6xl font-bold text-green-600 text-center mb-10">
          Sign Up
        </h1>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          className="w-full p-5 border rounded-2xl mb-6 text-2xl"
          required
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="w-full p-5 border rounded-2xl mb-6 text-2xl"
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="w-full p-5 border rounded-2xl mb-8 text-2xl"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white text-3xl font-bold py-4 rounded-2xl hover:bg-green-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}