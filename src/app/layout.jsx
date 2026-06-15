import { Poppins } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import PreloaderWrapper from "@/components/PreloaderWrapper";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Arka Ayurveda",
  description: "Ayurveda for the modern world",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={` ${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <LenisProvider>
          <PreloaderWrapper>{children}</PreloaderWrapper>
        </LenisProvider>
      </body>
    </html>
  );
}
