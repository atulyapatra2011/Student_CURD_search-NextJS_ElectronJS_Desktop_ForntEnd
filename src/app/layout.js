"use client"
import "./globals.css";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";

export default function RootLayout({ children }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  })
  return (
    <html lang="en" data-scroll-behavior="smooth">
    <body>
    <Navbar />
    {children}
    <Footer />
    </body>
    </html>
  );
}
