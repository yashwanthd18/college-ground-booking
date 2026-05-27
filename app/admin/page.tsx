"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [slots, setSlots] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

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

  const resetBookings =
    async () => {
      try {
        await Promise.all(
          slots.map((slot) =>
            fetch(
              `https://college-ground-booking-api.onrender.com/slots/${slot.id}`,
              {
                method:
                  "PATCH",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                body: JSON.stringify(
                  {
                    booked: false,
                    bookedBy: "",
                    bookingDate:
                      "",
                  }
                ),
              }
            )
          )
        );

        alert(
          "All bookings reset"
        );

        fetchSlots();
      } catch (error) {
        console.log(error);
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
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-5xl font-bold text-blue-600">
          Booking History
        </h1>

        <button
          onClick={
            resetBookings
          }
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl text-xl font-bold"
        >
          Reset Bookings
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-blue-600 text-white text-2xl">
            <tr>
              <th className="p-5 text-left">
                Sport
              </th>

              <th className="p-5 text-left">
                Time
              </th>

              <th className="p-5 text-left">
                Booked By
              </th>

              <th className="p-5 text-left">
                Date
              </th>

              <th className="p-5 text-left">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {slots.map(
              (slot) => (
                <tr
                  key={
                    slot.id
                  }
                  className="border-b text-xl"
                >
                  <td className="p-5">
                    {
                      slot.sport
                    }
                  </td>

                  <td className="p-5">
                    {
                      slot.time
                    }
                  </td>

                  <td className="p-5">
                    {slot.bookedBy ||
                      "Not Booked"}
                  </td>

                  <td className="p-5">
                    {slot.bookingDate ||
                      "-"}
                  </td>

                  <td className="p-5">
                    {slot.booked
                      ? "Booked"
                      : "Available"}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

        