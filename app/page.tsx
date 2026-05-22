export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-5xl font-bold text-blue-600 text-center">
        College Ground Booking System
      </h1>

      <p className="mt-4 text-gray-600 text-lg">
        Book your sports ground slots easily
      </p>

      <div className="flex gap-4 mt-8">
        <a
          href="/login"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Login
        </a>

        <a
          href="/register"
          className="bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          Sign Up
        </a>

        <a
          href="/dashboard"
          className="bg-purple-600 text-white px-6 py-3 rounded-lg"
        >
          Dashboard
        </a>
      </div>
    </div>
  );
}
