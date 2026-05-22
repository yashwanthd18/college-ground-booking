"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const [slots, setSlots] = useState<any[]>([]);

  // Protect Route
  useEffect(() => {
    const loggedUser =
      localStorage.getItem(
        "loggedInUser"
      );

    if (!loggedUser) {
      router.push("/login");
    }
  }, []);

  // Fetch Slots
  useEffect(() => {
    fetch("http://localhost:5000/slots")
      .then((res) => res.json())
      .then((data) => {
        setSlots(data);
      });
  }, []);

  // Book Slot
  const bookSlot = async (
  id: number
) => {
  const loggedUser =
    localStorage.getItem(
      "loggedInUser"
    );

  if (!loggedUser) {
    alert("Please login first");
    router.push("/login");
    return;
  }

  const currentUser =
    JSON.parse(loggedUser);

  const slot = slots.find(
    (slot) => slot.id === id
  );

  if (!slot) return;

  // Prevent duplicate booking
  if (slot.status === "Booked") {
    alert("Slot already booked");
    return;
  }

  const updatedSlot = {
    ...slot,
    status: "Booked",
    bookedBy: currentUser.name,
    bookingDate:
      new Date().toLocaleString(),
  };

  try {
    // Update backend
    await fetch(
      `http://localhost:5000/slots/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(
          updatedSlot
        ),
      }
    );

    // Update frontend state
    const updatedSlots =
      slots.map((slot) =>
        slot.id === id
          ? updatedSlot
          : slot
      );

    setSlots(updatedSlots);

    alert("Slot Booked Successfully");
  } catch (error) {
    console.log(error);

    alert("Booking Failed");
  }
};
  // Reset Bookings
  const resetBookings = async () => {
    const resetSlots = slots.map(
      (slot) => ({
        ...slot,
        status: "Available",
        bookedBy: "",
        bookingDate: "",
      })
    );

    for (const slot of resetSlots) {
      await fetch(
        `http://localhost:5000/slots/${slot.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(slot),
        }
      );
    }

    setSlots(resetSlots);
  };

  // Booking History
  const bookingHistory =
    slots.filter(
      (slot) =>
        slot.status === "Booked"
    );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">
          Ground Slots
        </h1>

        <button
          onClick={resetBookings}
          className="bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Reset Bookings
        </button>
      </div>

      {/* Slots */}
      <div className="grid md:grid-cols-3 gap-6">
        {slots.map((slot) => (
          <div
            key={slot.id}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-2">
              {slot.sport}
            </h2>

            <p className="text-gray-600 mb-4">
              {slot.time}
            </p>

            <div className="mb-4">
              <p
                className={`font-semibold ${
                  slot.status ===
                  "Available"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {slot.status}
              </p>

              {slot.bookedBy && (
                <p className="text-sm text-gray-600 mt-1">
                  Booked By:{" "}
                  {slot.bookedBy}
                </p>
              )}
            </div>

            <button
              onClick={() =>
                bookSlot(slot.id)
              }
              disabled={
                slot.status ===
                "Booked"
              }
              className={`w-full py-2 rounded-lg text-white ${
                slot.status ===
                "Available"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {slot.status ===
              "Available"
                ? "Book Now"
                : "Already Booked"}
            </button>
          </div>
        ))}
      </div>

      {/* Booking History */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-blue-600 mb-6">
          Booking History
        </h2>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-4 text-left">
                  Sport
                </th>

                <th className="p-4 text-left">
                  Time
                </th>

                <th className="p-4 text-left">
                  Booked By
                </th>

                <th className="p-4 text-left">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {bookingHistory.length >
              0 ? (
                bookingHistory.map(
                  (slot) => (
                    <tr
                      key={slot.id}
                      className="border-b"
                    >
                      <td className="p-4">
                        {slot.sport}
                      </td>

                      <td className="p-4">
                        {slot.time}
                      </td>

                      <td className="p-4">
                        {
                          slot.bookedBy
                        }
                      </td>

                      <td className="p-4">
                        {
                          slot.bookingDate
                        }
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="p-6 text-center text-gray-500"
                  >
                    No bookings yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}