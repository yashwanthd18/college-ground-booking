"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [slots, setSlots] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const loggedUser =
    typeof window !== "undefined"
      ? JSON.parse(
          localStorage.getItem(
            "loggedInUser"
          ) || "null"
        )
      : null;

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const response = await fetch(
        "https://college-ground-booking-api.onrender.com/slots"
      );

      const data =
        await response.json();

      setSlots(data);

      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };

  const bookSlot = async (
    slotId: number
  ) => {
    if (!loggedUser) {
      alert(
        "Please login first"
      );
      return;
    }

    const selectedSlot =
      slots.find(
        (slot) =>
          slot.id === slotId
      );

    if (
      selectedSlot.booked
    ) {
      alert(
        "Already Booked"
      );
      return;
    }

    try {
      await fetch(
        `https://college-ground-booking-api.onrender.com/slots/${slotId}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            booked: true,
            bookedBy:
              loggedUser.name,
            bookingDate:
              new Date().toLocaleDateString(),
          }),
        }
      );

      alert(
        "Slot Booked Successfully"
      );

      fetchSlots();
    } catch (error) {
      console.log(error);

      alert(
        "Booking Failed"
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-4xl font-bold">
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-6xl font-bold text-blue-600 mb-12">
        Ground Slots
      </h1>

      <div className="grid md:grid-cols-3 gap-10">
        {slots.map((slot) => (
          <div
            key={slot.id}
            className="bg-white p-8 rounded-3xl shadow-xl"
          >
            <h2 className="text-4xl font-bold mb-4">
              {slot.sport}
            </h2>

            <p className="text-2xl mb-4">
              {slot.time}
            </p>

            <p className="text-xl mb-6">
              Status:{" "}
              {slot.booked
                ? "Booked"
                : "Available"}
            </p>

            <button
              onClick={() =>
                bookSlot(
                  slot.id
                )
              }
              disabled={
                slot.booked
              }
              className={`w-full py-4 rounded-2xl text-2xl font-bold text-white ${
                slot.booked
                  ? "bg-gray-500"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {slot.booked
                ? "Booked"
                : "Book Slot"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}