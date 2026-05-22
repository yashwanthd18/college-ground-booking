"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] =
    useState<any>(null);

  useEffect(() => {
    const loggedUser =
      localStorage.getItem(
        "loggedInUser"
      );

    if (!loggedUser) {
      router.push("/login");
    } else {
      setUser(
        JSON.parse(loggedUser)
      );
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-lg">
        <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">
          User Profile
        </h1>

        <div className="space-y-4 text-xl">
          <p>
            <span className="font-bold">
              Name:
            </span>{" "}
            {user.name}
          </p>

          <p>
            <span className="font-bold">
              Email:
            </span>{" "}
            {user.email}
          </p>

          <p>
            <span className="font-bold">
              Password:
            </span>{" "}
            {user.password}
          </p>
        </div>
      </div>
    </div>
  );
}