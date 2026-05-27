"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin =
    async () => {
      if (
        !email ||
        !password
      ) {
        alert(
          "Fill all fields"
        );
        return;
      }

      try {
        const response =
          await fetch(
            `https://college-ground-booking-api.onrender.com/users?email=${email}&password=${password}`
          );

        const data =
          await response.json();

        if (
          data.length === 0
        ) {
          alert(
            "Invalid Credentials"
          );
          return;
        }

        localStorage.setItem(
          "loggedInUser",
          JSON.stringify(
            data[0]
          )
        );

        alert(
          "Login Successful"
        );

        router.push(
          "/dashboard"
        );
      } catch (error) {
        console.log(error);

        alert(
          "Server Error"
        );
      }
    };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-xl">
        <h1 className="text-6xl font-bold text-blue-600 text-center mb-10">
          Login
        </h1>

        <div className="space-y-6">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="w-full p-5 rounded-2xl border text-2xl"
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full p-5 rounded-2xl border text-2xl"
          />

          <button
            onClick={
              handleLogin
            }
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-3xl font-bold py-5 rounded-2xl"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}