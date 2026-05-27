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

  const handleRegister =
    async () => {
      if (
        !name ||
        !email ||
        !password
      ) {
        alert(
          "Fill all fields"
        );
        return;
      }

      try {
        const checkUser =
          await fetch(
            `https://college-ground-booking-api.onrender.com/users?email=${email}`
          );

        const existingUser =
          await checkUser.json();

        if (
          existingUser.length >
          0
        ) {
          alert(
            "User already exists"
          );
          return;
        }

        const response =
          await fetch(
            "https://college-ground-booking-api.onrender.com/users",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify(
                {
                  name,
                  email,
                  password,
                }
              ),
            }
          );

        const data =
          await response.json();

        localStorage.setItem(
          "loggedInUser",
          JSON.stringify(data)
        );

        alert(
          "Registration Successful"
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
        <h1 className="text-6xl font-bold text-green-600 text-center mb-10">
          Sign Up
        </h1>

        <div className="space-y-6">
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            className="w-full p-5 rounded-2xl border text-2xl"
          />

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
              handleRegister
            }
            className="w-full bg-green-600 hover:bg-green-700 text-white text-3xl font-bold py-5 rounded-2xl"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}