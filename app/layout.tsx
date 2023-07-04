import "./globals.css";

import { Navbar, Footer } from "@/components";

const metadata = {
  title: "Flexibble",
  description: "Your source of inspiration in web development",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative">
        <Navbar />
          <main>
            {children}
          </main>
        <Footer />
      </body>
    </html>
  );
}
