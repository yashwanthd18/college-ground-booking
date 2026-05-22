import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "College Ground Booking",
  description: "Ground Booking System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}