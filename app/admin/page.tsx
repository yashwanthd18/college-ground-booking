"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
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

  // Fetch Slots From Backend
  useEffect(() => {
    fetch("http://localhost:5000/slots")
      .then((res) => res.json())
      .then((data) => {
        setSlots(data);
      });
  }, []);

  // Delete Booking
  const deleteBooking = async (
    id: number
  ) => {
    const slot = slots.find(
      (slot) => slot.id === id
    );

    if (!slot) return;

    const updatedSlot = {
      ...slot,
      status: "Available",
      bookedBy: "",
      bookingDate: "",
    };

    try {
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

      const updatedSlots =
        slots.map((slot) =>
          slot.id === id
            ? updatedSlot
            : slot
        );

      setSlots(updatedSlots);

      alert("Booking Removed");
    } catch (error) {
      console.log(error);

      alert("Failed To Remove");
    }
  };

  // Only Booked Slots
  const bookedSlots = slots.filter(
    (slot) => slot.status === "Booked"
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">
        Admin Panel
      </h1>

      {/* Stats */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
        <h2 className="text-2xl font-bold">
          Total Bookings
        </h2>

        <p className="text-5xl font-bold text-red-600 mt-4">
          {bookedSlots.length}
        </p>
      </div>

      {/* Table */}
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
                Student
              </th>

              <th className="p-4 text-left">
                Date
              </th>

              <th className="p-4 text-left">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {bookedSlots.length >
            0 ? (
              bookedSlots.map((slot) => (
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
                    {slot.bookedBy}
                  </td>

                  <td className="p-4">
                    {slot.bookingDate}
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() =>
                        deleteBooking(
                          slot.id
                        )
                      }
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="p-6 text-center text-gray-500"
                >
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}